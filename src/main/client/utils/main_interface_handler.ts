import * as alt from 'alt-client';

let mainInterface: alt.WebView = null;

export async function loadMainInterface() {
  const DEVELOPMENT_URL = 'http://localhost:5173/';
  const PRODUCTION_URL = 'http://assets/webviews/interfaces/index.html';

  mainInterface = new alt.WebView(DEVELOPMENT_URL);

  alt.onServer('emitToWebView', (eventName: string, data) => {
    mainInterface.emit(eventName, data);
  });

  alt.on('emitToWebView', (eventName: string, data) => {
    mainInterface.emit(eventName, data);
  });

  mainInterface.on(
    'emitTo',
    (eventType: 'server' | 'client', eventName: string, data) => {
      if (eventType === 'server') return alt.emitServerRaw(eventName, data);
      return alt.emitRaw(eventName, data);
    }
  );

  await new Promise((resolve) => {
    mainInterface.once('load', resolve);
  });

  mainInterface.focus();
}

export function mainInterfaceToggleFocus(state: boolean) {
  if (state) return mainInterface.focus();
  return mainInterface.unfocus();
}
