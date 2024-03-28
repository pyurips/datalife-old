import * as alt from 'alt-client';

export async function account_getOne(data: any) {
  return await alt.emitRpc('rpc', 'account_getOne');
}
