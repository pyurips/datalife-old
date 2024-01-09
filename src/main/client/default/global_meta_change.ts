import * as alt from 'alt-client';
import { mainInterfaceToggleFocus } from '../utils/main_interface_handler.js';
import { emitter } from '../utils/cevents.js';

alt.on('globalMetaChange', (key, newValue, oldValue) => {
  if (key === 'currentScreen') {
    if (newValue === 'debugHud') {
      mainInterfaceToggleFocus(false);
    } else {
      mainInterfaceToggleFocus(true);
    }
    return emitter('mainInterface', 'response', 'webview_setScreen', { data: newValue, status: 200, error: null });
  }

  if (key === 'debugCamState') {
    if (newValue) return alt.toggleGameControls(false);
    return alt.toggleGameControls(true);
  }
});
