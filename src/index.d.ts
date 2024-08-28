export interface IOptions {
  ETHREUM_RPC?: string
  SAFE_CLIENT_URL?: string
}

interface SafeInfoAddress {
  value: string
  name?: string | null
  logoUri?: string | null
}

type StringOrNull = string | null

export interface SafeInfo {
  address: SafeInfoAddress
  chainId: string
  nonce: number
  threshold: number
  owners: SafeInfoAddress[]
  implementation: SafeInfoAddress
  implementationVersionState: 'string'
  collectiblesTag: StringOrNull
  txQueuedTag: string
  txHistoryTag: string
  messagesTag: string
  modules: StringOrNull
  fallbackHandler: SafeInfoAddress
  guard: StringOrNull
  version: string
}
