import { InjectionToken } from '@angular/core';

/**
 * Ponto de extensão para sincronização em nuvem (futura).
 *
 * A aplicação é 100% offline-first: toda escrita vai para o IndexedDB.
 * Quando a sincronização for implementada, um adapter real (ex.: Supabase,
 * Firebase, CouchDB/PouchDB ou API própria) implementa esta interface e é
 * registrado no `app.config.ts` no lugar do NoopSyncAdapter.
 *
 * Estratégia sugerida (ver README):
 *  - push: enviar registros com `updatedAt > lastSyncAt`;
 *  - pull: aplicar registros remotos mais novos (last-write-wins por campo `updatedAt`);
 *  - tombstones: exclusões devem virar registros marcados (soft delete) antes do sync.
 */
export interface SyncAdapter {
  /** Envia alterações locais e busca alterações remotas. */
  sync(): Promise<void>;
  /** Se o adapter está configurado/habilitado. */
  readonly enabled: boolean;
}

export class NoopSyncAdapter implements SyncAdapter {
  readonly enabled = false;
  async sync(): Promise<void> { /* offline-only */ }
}

export const SYNC_ADAPTER = new InjectionToken<SyncAdapter>('SYNC_ADAPTER');
