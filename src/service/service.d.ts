import { type SafeTransactionData } from '@safe-global/safe-core-sdk-types'

export interface Safes {
  safes: string[]
}

export interface SafeClientServiceOptions {
  CHAIN_ID: string
  SAFE_CLIENT_URL: string
}
export interface ProposeTransactionProps {
  safeAddress: string
  safeTransactionData: SafeTransactionData
  safeTxHash: string
  senderAddress: string
  senderSignature: string
  origin?: string
}
