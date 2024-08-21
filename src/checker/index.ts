import { SafeConfig } from "@safe-global/protocol-kit";
import { isAddress } from "ethers/lib/utils";

export enum errors {
  INVALID_ADDRESS = "invalid address",
  INVALID_SAFE_CONFIG = "invalid safe config",
}

export const checkAddress = (address: string) => {
  if (!isAddress(address)) {
    throw new Error(errors.INVALID_ADDRESS);
  }
  return true;
};

export const checkSafeConfig = (safeConfig: SafeConfig) => {
  const { signer, provider, safeAddress } = safeConfig;
  if (!safeAddress || !provider || !signer) {
    throw new Error(errors.INVALID_SAFE_CONFIG);
  }
  return true;
};
