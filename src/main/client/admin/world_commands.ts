import * as alt from 'alt-client';

export async function admin_world_tele_to_coords(data: any) {
  await alt.emitRpc('rpc', 'admin_world_tele_to_coords', data);
}