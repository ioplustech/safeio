import { type SafeConfig } from '@safe-global/protocol-kit'

export interface SafeInitOptions {
  value?: string
}
type SafeOptions = {
  safeConfig?: SafeConfig
  options?: SafeInitOptions
} | null
