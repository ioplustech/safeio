import { checkSafeConfig } from "../checker";
import type { SafeCoreOptions } from "../index.d";
import Safe, { SafeConfig } from "@safe-global/protocol-kit";

type Options = {
  safeConfig?: SafeConfig;
  safeCoreOptions?: SafeCoreOptions;
} | null;

export class SafeCore {
  safeConfig?: SafeConfig = { signer: "", provider: "", safeAddress: "" };
  safeCoreOptions?: SafeCoreOptions;
  safeSDK: Safe | null = null;
  SDKMap: Map<any, Safe> = new Map();

  constructor(options: Options) {
    if (!options) return;
    const { safeConfig, safeCoreOptions } = options;
    this.safeConfig = safeConfig;
    this.safeCoreOptions = safeCoreOptions;
  }
  async getSDK(safeConfig: SafeConfig) {
    checkSafeConfig(safeConfig);
    let cacheSDK = this.SDKMap.get(safeConfig);
    if (!cacheSDK) {
      cacheSDK = await Safe.init(safeConfig);
      this.SDKMap.set(safeConfig, cacheSDK);
    }
    return cacheSDK;
  }
  async sendEther() {}
  async sendERC20() {}
  async sendToken() {}
  async batchTx() {}
}
