import * as native from 'natives';
import * as alt from 'alt-client';
// @ts-ignore
import { setScreenMode } from 'alt:utils';

alt.onServer('request:character_loadIntoCreator', () => {
  const player = alt.Player.local;
  native.requestIpl('apa_v_mp_h_01_b');
  player.pos = new alt.Vector3(-763.17, 330.59, 199.49);
  player.rot = new alt.Vector3(0, 0, -3.0605);
  alt.emitRaw('request:auth_destroySigninCamera');
  setScreenMode(false);
  alt.emitRaw('emitToWebView', 'response:auth_signin', null);
  alt.setMeta('currentScreen', 'debugHud');
});
