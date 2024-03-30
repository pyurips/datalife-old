import * as alt from 'alt-client';

export async function admin_vehicles_createToMe(data: any) {
  await alt.emitRpc('rpc', 'admin_vehicles_createToMe', data);
}
