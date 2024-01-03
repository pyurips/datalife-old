import * as alt from 'alt-client';

const player = alt.Player.local;
const EVENT_NAME = 'debug_getGeneralInfos';

alt.on('request:' + EVENT_NAME, () => {
  alt.emitRaw('emitToWebView', 'response:debug_getPlayerCoordinates', {
    x: player.pos.x.toFixed(2),
    y: player.pos.y.toFixed(2),
    z: player.pos.z.toFixed(2),
  });

  alt.emitRaw('emitToWebView', 'response:debug_getPlayerRotation', {
    x: player.rot.x.toFixed(2),
    y: player.rot.y.toFixed(2),
    z: player.rot.z.toFixed(2),
  });

  alt.emitRaw('emitToWebView', 'response:debug_getPlayerSpeed', {
    speed: player.moveSpeed.toFixed(2),
  });
});
