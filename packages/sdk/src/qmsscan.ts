import { ecosystemLinks } from "@qms-passport/chain-config";

export type QmsscanAddressTx = {
  hash: `0x${string}`;
  block_number: number;
  timestamp: string;
  from: { hash: `0x${string}` };
  to: { hash: `0x${string}`; name?: string | null; is_contract?: boolean } | null;
  method?: string | null;
  status: string;
  confirmations: number;
};

type Paginated<T> = {
  items: T[];
  next_page_params?: Record<string, unknown> | null;
};

export type QmsscanClientOptions = {
  baseUrl?: string;
  fetchFn?: typeof fetch;
};

export function createQmsscanClient(options: QmsscanClientOptions = {}) {
  const baseUrl = (options.baseUrl ?? ecosystemLinks.qmsscanApiV2).replace(/\/$/, "");
  const fetchFn = options.fetchFn ?? fetch;

  async function getJson<T>(path: string): Promise<T> {
    const res = await fetchFn(`${baseUrl}${path}`, {
      headers: { accept: "application/json" },
    });
    if (!res.ok) {
      throw new Error(`QMSScan ${path} failed: ${res.status} ${res.statusText}`);
    }
    return res.json() as Promise<T>;
  }

  return {
    async getStats() {
      return getJson<Record<string, unknown>>("/stats");
    },

    async getBlock(height: number | bigint) {
      return getJson<Record<string, unknown>>(`/blocks/${height}`);
    },

    async getTransaction(hash: `0x${string}`) {
      return getJson<Record<string, unknown>>(`/transactions/${hash}`);
    },

    async getAddressTransactions(
      address: `0x${string}`,
      opts?: { maxPages?: number },
    ): Promise<QmsscanAddressTx[]> {
      const maxPages = opts?.maxPages ?? 3;
      const items: QmsscanAddressTx[] = [];
      let nextPath: string | null = `/addresses/${address}/transactions`;

      for (let page = 0; page < maxPages && nextPath; page++) {
        const data: Paginated<QmsscanAddressTx> = await getJson(nextPath);
        items.push(...data.items);
        const npp = data.next_page_params;
        if (!npp) {
          break;
        }
        const params = new URLSearchParams();
        for (const [k, v] of Object.entries(npp)) {
          params.set(k, String(v));
        }
        nextPath = `/addresses/${address}/transactions?${params.toString()}`;
      }

      return items;
    },
  };
}
