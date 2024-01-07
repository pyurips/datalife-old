import * as alt from 'alt-server';
import accounts_getOne from '../../database/mongodb/operations/accounts/get_one.js';

const EVENT_NAME = 'auth_enterGame';

alt.on(`request:${EVENT_NAME}`, async (player: alt.Player) => {
  player.emitRaw('request:auth_enterGame');
  player.dimension = 0;
  player.spawn(-763.17, 330.59, 199.49, 0);
  player.rot = new alt.Vector3(0, 0, -3.0605);
  const userId = player.getLocalMeta('dbId');
  if (typeof userId === 'string') {
    const data = await accounts_getOne(userId);
    alt.log(data);
  }
});
