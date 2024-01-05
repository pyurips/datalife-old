import * as alt from 'alt-client';
import {
  setScreenMode,
  // @ts-ignore
} from 'alt:utils';

alt.on('keyup', async (key) => {
  if (key === 113) {
    const currentScreen = alt.getMeta('currentScreen');
    if (currentScreen === 'debugHud') {
      setScreenMode(true);
      return alt.setMeta('currentScreen', 'adminPanel');
    }

    setScreenMode(false);
    return alt.setMeta('currentScreen', 'debugHud');
  }

  if (key === 114) {
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) {
      alt.setMeta('debugCamState', false);
      return alt.emitRaw('request:debug_unrenderDebugCam');
    }
    alt.setMeta('debugCamState', true);
    return alt.emitRaw('request:debug_initializeDebugCam');
  }
});
