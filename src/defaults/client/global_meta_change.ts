import * as alt from 'alt-client';

alt.on('globalMetaChange', (key, newValue, oldValue) => {
  if (key === 'currentScreen') {
    if (newValue === 'debugHud') {
      alt.emitRaw('request:webview_toggleFocus', false);
    } else {
      alt.emitRaw('request:webview_toggleFocus', true);
    }
    return alt.emitRaw('emitToWebView', 'response:webview_setScreen', newValue);
  }

  if (key === 'debugCamState') {
    if (newValue) return alt.toggleGameControls(false);
    return alt.toggleGameControls(true);
  }
});
