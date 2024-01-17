import * as alt from 'alt-client';
import webViewEmitter from '../utils/webview_emitter.js';

const player = alt.Player.local;

alt.everyTick(() => {
  webViewEmitter('emitToMainInterface', 'debugMode_sendPlayerCoords', {
    x: player.pos.x.toFixed(3),
    y: player.pos.y.toFixed(3),
    z: player.pos.z.toFixed(3),
  });
  webViewEmitter('emitToMainInterface', 'debugMode_sendPlayerRot', {
    x: player.rot.x.toFixed(3),
    y: player.rot.y.toFixed(3),
    z: player.rot.z.toFixed(3),
  });
  webViewEmitter(
    'emitToMainInterface',
    'debugMode_sendPlayerSpeed',
    { speed: player.moveSpeed.toFixed(3) }
  );
});
