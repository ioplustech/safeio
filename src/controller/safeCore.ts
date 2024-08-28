import { checkSafeConfig } from '../checker'
import Safe, { type SafeConfig } from '@safe-global/protocol-kit'
import type { SafeInitOptions, SafeOptions } from './controller'

export class SafeCore {
  safeConfig?: SafeConfig = { signer: '', provider: '', safeAddress: '' }
  options?: SafeInitOptions
  safeSDK: Safe | null = null
  SDKMap = new Map<any, Safe>()

  constructor (opts: SafeOptions) {
    if (!opts) return
    const { safeConfig, options } = opts
    this.safeConfig = safeConfig
    this.options = options
  }

  async getSDK (safeConfig: SafeConfig) {
    checkSafeConfig(safeConfig)
    let cacheSDK = this.SDKMap.get(safeConfig)
    if (!cacheSDK) {
      cacheSDK = await Safe.init(safeConfig)
      this.SDKMap.set(safeConfig, cacheSDK)
    }
    return cacheSDK
  }

  async sendEther () {}
  async sendERC20 () {}
  async sendToken () {}
  async batchTx () {}
}
