import type { QuasarClient } from '../../core/client';
import type { HistoryQuery, PaginatedResult, Transaction, UpdatableTransactionFields } from '../../types';

export class PulsarModule {
  constructor(private readonly client: QuasarClient) {}

  /**
   * Syncs a newly created pending transaction to the cloud.
   */
  async syncCreate(tx: Transaction): Promise<{ success: true; txKey: string }> {
    return this.client.request('/api/v1/engine/tx-sync', {
      method: 'POST',
      body: tx,
    });
  }

  /**
   * Updates an existing transaction's status or parameters.
   */
  async syncUpdate(txKey: string, patches: UpdatableTransactionFields): Promise<{ success: true }> {
    return this.client.request('/api/v1/engine/tx-sync', {
      method: 'PATCH',
      body: { txKey, ...patches },
    });
  }

  /**
   * Retrieves transaction history with strict typing.
   */
  async getHistory(query: HistoryQuery = {}): Promise<PaginatedResult<Transaction>> {
    return this.client.request('/api/v1/engine/txs-history', {
      method: 'GET',
      query: {
        page: query.page ?? 1,
        limit: query.limit ?? 10,
        chainId: query.chainId,
        status: query.status,
        txKey: query.txKey,
      },
    });
  }
}
