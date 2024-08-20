import AxiosFetchWrapper from "../fetch";
import type { SafeClientServiceOptions, SafeInfo } from "../index.d";

export class SafeClientService {
  safeClientApi: AxiosFetchWrapper;
  CHAIN_ID: string;
  SAFE_CLIENT_URL: string;
  constructor(options: SafeClientServiceOptions) {
    const { SAFE_CLIENT_URL, CHAIN_ID } = options;
    this.CHAIN_ID = CHAIN_ID;
    this.SAFE_CLIENT_URL = SAFE_CLIENT_URL;

    this.safeClientApi = new AxiosFetchWrapper(this.SAFE_CLIENT_URL);
  }
  getSafeInfo<SafeInfo>(address: string) {
    const path = `/v1/chains/${this.CHAIN_ID}/safes/${address}`;
    return this.safeClientApi.get<SafeInfo>(path);
  }
  getSafeTxDetail(txId: string) {
    const path = `/v1/chains/${this.CHAIN_ID}/transactions/${txId}`;
    return this.safeClientApi.get(path);
  }
  getSafeListByOwner(txId: string) {
    const path = `/v1/chains/${this.CHAIN_ID}/owners/${txId}/safes`;
    return this.safeClientApi.get(path);
  }
}
