import * as alt from 'alt-client';
import requester from '../requester.js';

let mainInterface: alt.WebView = null;

export async function loadMainInterface() {
  const DEVELOPMENT_URL = 'http://localhost:5173/';
  const PRODUCTION_URL = 'http://assets/webviews/main_interface/index.html';

  mainInterface = new alt.WebView(PRODUCTION_URL);

  alt.onServer('emitToMainInterface', (eventName: string, data) => {
    mainInterface.emit(eventName, data);
  });

  alt.on('emitToMainInterface', (eventName: string, data) => {
    mainInterface.emit(eventName, data);
  });

  mainInterface.on('request', async (operationName: string, data?: unknown) => {
    try {
      const response = requester(operationName, data);
      mainInterface.emit(`response:${operationName}`, response);
    } catch (error) {
      mainInterface.emit(`response:${operationName}`, {
        error,
      });
    }
  });

  await new Promise((resolve) => {
    mainInterface.once('load', resolve);
  });

  mainInterface.focus();
}

export function mainInterfaceToggleFocus(state: boolean) {
  if (state) return mainInterface.focus();
  return mainInterface.unfocus();
}
