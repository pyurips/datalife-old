import * as alt from 'alt-client';
import { mainInterfaceToggleFocus } from '../utils/main_interface_handler.js';
import webViewEmitter from '../utils/webview_emitter.js';

alt.on('globalMetaChange', (key, newValue, oldValue) => {
  if (key === 'currentScreen') {
    if (newValue === 'hud') {
      mainInterfaceToggleFocus(false);
    } else {
      mainInterfaceToggleFocus(true);
    }
    return webViewEmitter('emitToMainInterface', 'webView_setScreen', newValue);
  }

  if (key === 'debugCamState') {
    if (newValue) return alt.toggleGameControls(false);
    return alt.toggleGameControls(true);
  }
});
