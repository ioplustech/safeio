import { isAddress } from "ethers/lib/utils";

export enum errors {
  INVALID_ADDRESS = "invalid address",
}

export const checkAddress = (address: string) => {
  if (!isAddress(address)) {
    throw new Error(errors.INVALID_ADDRESS);
  }
  return true;
};
