import * as alt from 'alt-client';

export function admin_world_tele_to_coords(data: any) {
  alt.emitRpc('rpc', 'admin_world_tele_to_coords', data);
}