import * as alt from 'alt-client';
// @ts-ignore
import { setScreenMode } from 'alt:utils';

const EVENT_NAME = 'auth_enterGame';

alt.onceServer(`request:${EVENT_NAME}`, () => {
  setScreenMode(false);
  alt.setMeta('currentScreen', 'debugHud');
  alt.emitRaw('request:auth_destroySigninCamera');
});
