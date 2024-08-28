import AxiosFetchWrapper from '../fetch'
import type { ProposeTransactionProps, SafeClientServiceOptions, Safes } from './service'
import { type SafeSetupConfig } from '@safe-global/safe-core-sdk-types'
import { type TransactionDetails } from '@safe-global/safe-gateway-typescript-sdk'

export class SafeClientService {
  CHAIN_ID: string
  SAFE_CLIENT_URL: string
  safeClientApi: AxiosFetchWrapper

  constructor (options: SafeClientServiceOptions) {
    const { SAFE_CLIENT_URL, CHAIN_ID } = options
    this.CHAIN_ID = CHAIN_ID
    this.SAFE_CLIENT_URL = SAFE_CLIENT_URL

    this.safeClientApi = new AxiosFetchWrapper(this.SAFE_CLIENT_URL)
  }

  async getSafeInfo (address: string) {
    const path = `/v1/chains/${this.CHAIN_ID}/safes/${address}`
    return await this.safeClientApi.get<SafeSetupConfig>(path)
  }

  async getSafeTxDetail (txId: string) {
    const path = `/v1/chains/${this.CHAIN_ID}/transactions/${txId}`
    return await this.safeClientApi.get<TransactionDetails>(path)
  }

  async getSafes (address: string) {
    const path = `/v1/chains/${this.CHAIN_ID}/owners/${address}/safes`
    return await this.safeClientApi.get<Safes>(path)
  }

  async proposeTransaction (safeAddress: string, body: ProposeTransactionProps) {
    const path = `/v1/chains/${this.CHAIN_ID}/transactions/${safeAddress}/propose`
    return await this.safeClientApi.post<TransactionDetails>(path, body)
  }
}
