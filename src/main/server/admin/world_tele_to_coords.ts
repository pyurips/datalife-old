import * as alt from 'alt-server';
import sendClientError from '../utils/client_error.js';

async function admin_world_tele_to_coords(player: alt.Player, data?: any) {
  try {
    const accountData = player.getLocalMeta('accountData') as any;
    if (accountData.permission_level < 2)
      return alt.log(
        `Player ${player.name} tried to use admin command admin_world_tele_to_coords without permission`
      );
    player.pos = new alt.Vector3(+data.x, +data.y, +data.z);
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1711564700);
  }
}

export default admin_world_tele_to_coords;
