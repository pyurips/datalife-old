import * as alt from 'alt-server';

const EVENT_NAME = 'auth_enterGame';

alt.on(`request:${EVENT_NAME}`, (player: alt.Player) => {
  player.emitRaw('request:auth_enterGame');
  player.dimension = 0;
  player.spawn(-763.17, 330.59, 199.49, 0);
  player.rot = new alt.Vector3(0, 0, -3.0605);
});
