import { SafeClientService } from "./service/safeClient";
import { ethers } from "ethers";
import { optionsKeys } from "./config";
import { checkAddress } from "./checker";
import type { IOptions } from "./index.d";
import AxiosFetchWrapper from "./fetch";

// TODO
type Fn = () => void | Promise<void>;
export const runTest = async (Fn: Fn) => {
  try {
    await Fn();
  } catch (err) {
    if (err instanceof TypeError) {
      console.error(err);
    }
  }
};

export class SafeIO {
  ETHREUM_RPC?: string;
  CHAIN_ID: string = "1";
  FROM_CHAIN: string = "ethereum";
  SAFE_CLIENT_URL?: string;
  SAFE_ADDRESS_LIST: string[] = [];
  SAFE_ADDRESS_ACTIVE?: string;
  OWNER_LIST: ethers.Wallet[] = [];
  OWNER_ADDRESS_ACTIVE?: string;
  // safeClientApi: AxiosFetchWrapper;
  safeClientService: SafeClientService;

  constructor(options: IOptions | undefined) {
    this.initOptions(options);
    this.safeClientService = new SafeClientService({
      CHAIN_ID: this.CHAIN_ID,
      SAFE_CLIENT_URL: this.SAFE_CLIENT_URL!,
    });
  }
  initOptions(options: IOptions | undefined) {
    if (!options) return;
    this.initDefault();
    for (let option in options) {
      if (this.checkOption(option, options[option as keyof IOptions])) {
        (this as any)[option as keyof IOptions] =
          options[option as keyof IOptions];
      }
    }
  }
  initDefault() {
    this.ETHREUM_RPC = "https://rpc.flashbots.net/";
    this.SAFE_CLIENT_URL = "https://safe-client.safe.global/";
  }
  checkOption(option: string, value: string | undefined) {
    // RPC checker
    return optionsKeys.includes(option) && value;
  }
  async addOwner(wallet: ethers.Wallet) {
    const address = await wallet.getAddress();
    const existList: string[] = [];
    for (let owner of this.OWNER_LIST) {
      const add = await owner.getAddress();
      existList.push(add);
    }
    if (!existList.includes(address)) {
      this.OWNER_LIST.push(wallet);
    } else {
      console.warn(`address: ${address} already imported!`);
    }
  }
  async fromPrivateKey(privateKey: string) {
    const wallet = new ethers.Wallet(privateKey);
    this.addOwner(wallet);
  }
  async fromMnemonic(mnemonic: string) {
    const wallet = ethers.Wallet.fromMnemonic(mnemonic);
    this.addOwner(wallet);
  }
  async fromJSON(json: string, password: string) {
    const wallet = ethers.Wallet.fromEncryptedJsonSync(json, password);
    this.addOwner(wallet);
  }
  setSafeAddress(address: string) {
    checkAddress(address);
    if (!this.SAFE_ADDRESS_LIST.includes(address)) {
      this.SAFE_ADDRESS_LIST.push(address);
    }
    this.SAFE_ADDRESS_ACTIVE = address;
    this.checkSafeDetail(address);
    return this;
  }
  getSafeAddress() {
    return this.SAFE_ADDRESS_ACTIVE;
  }
  checkSafeDetail(address: string) {}
}
