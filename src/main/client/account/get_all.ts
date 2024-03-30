import * as alt from 'alt-client';

export async function account_getAll(data: any) {
  return await alt.emitRpc('rpc', 'account_getAll');
}
