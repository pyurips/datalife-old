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

  if (key === 65) { // A
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamX', -0.1);
  }

  if (key === 68) { // D
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamX', 0.1);
  }

  if (key === 87) { // W
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamY', 0.1);
  }

  if (key === 83) { // S
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamY', -0.1);
  }

  if (key === 32) { // SPACE
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamZ', 0.1);
  }

  if (key === 17) { // CTRL
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamZ', -0.1);
  }

  if (key === 81) { // Q
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamRot', 0.5);
  }

  if (key === 69) { // E
    const debugCamState = alt.getMeta('debugCamState');
    if (debugCamState) return alt.emitRaw('request:debug_setDebugCamRot', -0.5);
  }
});
