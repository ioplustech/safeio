import { ethers } from 'ethers'
import { defaultSafeOptions, optionsKeys } from './config'
import { checkAddress } from './checker'
import { SafeCore } from './controller/safeCore'
import { SafeClientService } from './service/safeClient'
import type { IOptions } from './index.d'
import type Safe from '@safe-global/protocol-kit'
import { type SafeConfig, type SafeConfigWithSafeAddress } from '@safe-global/protocol-kit'

// TODO
type Fn = () => void | Promise<void>
export const runTest = async (Fn: Fn) => {
  try {
    await Fn()
  } catch (err) {
    if (err instanceof TypeError) {
      console.error(err)
    }
  }
}

export class SafeIO {
  ETHREUM_RPC?: string
  CHAIN_ID: string = '1'
  FROM_CHAIN: string = 'ethereum'

  SAFE_CLIENT_URL?: string
  readonly #SAFE_ADDRESS_LIST: string[] = []
  SAFE_ADDRESS_ACTIVE?: string

  readonly #OWNER_LIST: ethers.Wallet[] = []
  OWNER_ADDRESS_ACTIVE?: string
  OWNER_ACTIVE?: ethers.Wallet
  readonly #safeClientService: SafeClientService
  #safeSDK: Safe | null = null
  readonly #safeCore: SafeCore

  constructor (options: IOptions | undefined) {
    this.#initOptions(options)
    this.#safeClientService = new SafeClientService({
      CHAIN_ID: this.CHAIN_ID,
      SAFE_CLIENT_URL: this.SAFE_CLIENT_URL!
    })
    this.#safeCore = new SafeCore({})
  }

  async createSafeSDK ({ provider, signer, safeAddress }: SafeConfigWithSafeAddress) {
    const sdk = await this.#safeCore.getSDK({ provider, signer, safeAddress })
    return sdk
  }

  async #initSafeSDK () {
    if (this.#safeSDK) return this.#safeSDK
    const safeConfig: SafeConfig = {
      provider: this.ETHREUM_RPC!,
      signer: this.OWNER_ACTIVE?.address,
      safeAddress: this.SAFE_ADDRESS_ACTIVE!
    }
    this.#safeSDK = await this.createSafeSDK(safeConfig)
  }

  #initOptions (options: IOptions | undefined) {
    if (!options) return
    this.initDefault()
    for (const option in options) {
      if (this.checkOption(option, options[option as keyof IOptions])) {
        (this as any)[option as keyof IOptions] =
          options[option as keyof IOptions]
      }
    }
  }

  initDefault () {
    const {
      CHAIN_ID,
      FROM_CHAIN,
      ETHREUM_RPC,
      SAFE_CLIENT_URL
    } = defaultSafeOptions
    this.CHAIN_ID = CHAIN_ID
    this.FROM_CHAIN = FROM_CHAIN
    this.ETHREUM_RPC = ETHREUM_RPC
    this.SAFE_CLIENT_URL = SAFE_CLIENT_URL
  }

  checkOption (option: string, value: string | undefined) {
    // RPC checker
    return optionsKeys.includes(option) && value
  }

  async addOwner (wallet: ethers.Wallet) {
    const address = await wallet.getAddress()
    const existList: string[] = []
    for (const owner of this.#OWNER_LIST) {
      const add = await owner.getAddress()
      existList.push(add)
    }
    if (!existList.includes(address)) {
      this.#OWNER_LIST.push(wallet)
    } else {
      console.warn(`address: ${address} already imported!`)
    }
  }

  async fromPrivateKey (privateKey: string) {
    const wallet = new ethers.Wallet(privateKey)
    await this.addOwner(wallet)
  }

  async fromMnemonic (mnemonic: string) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic)
    await this.addOwner(wallet)
  }

  async fromJSON (json: string, password: string) {
    const wallet = ethers.Wallet.fromEncryptedJsonSync(json, password)
    await this.addOwner(wallet)
  }

  async listSafes () {
    await this.#initSafeSDK()
    const safes = await this.#safeClientService.getSafes(
      await this.OWNER_ACTIVE!.getAddress()
    )
    return safes
  }

  async listOwners () {
    await this.#initSafeSDK()
    const safes = await this.#safeClientService.getSafeInfo(
      this.SAFE_ADDRESS_ACTIVE!
    )
    return safes
  }

  setSafeAddress (address: string) {
    checkAddress(address)
    if (!this.#SAFE_ADDRESS_LIST.includes(address)) {
      this.#SAFE_ADDRESS_LIST.push(address)
    }
    this.SAFE_ADDRESS_ACTIVE = address
    this.checkSafeDetail(address)
    return this
  }

  getSafeAddress () {
    return this.SAFE_ADDRESS_ACTIVE
  }

  checkSafeDetail (address: string) {}
}
