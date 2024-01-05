import * as alt from 'alt-client';
// @ts-ignore
import { setScreenMode } from 'alt:utils';
import * as native from 'natives';

const EVENT_NAME = 'auth_enterGame';

alt.onceServer(`request:${EVENT_NAME}`, () => {
  native.requestIpl('apa_v_mp_h_01_b');
  setScreenMode(false);
  alt.setMeta('currentScreen', 'debugHud');
  alt.emitRaw('request:auth_destroySigninCamera');
});
