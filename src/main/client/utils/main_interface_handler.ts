import * as alt from 'alt-client';
import operations from './operations';

let mainInterface: alt.WebView = null;

export async function loadMainInterface() {
  const DEVELOPMENT_URL = 'http://localhost:5173/';
  const PRODUCTION_URL = 'http://assets/webviews/main_interface/index.html';

  mainInterface = new alt.WebView(DEVELOPMENT_URL);

  alt.onServer('emitToMainInterface', (eventName: string, data) => {
    mainInterface.emit(eventName, data);
  });

  mainInterface.on('request', async (operationName: string, data?: unknown) => {
    const operation = operations[operationName];
    if (!operation)
      return alt.logError(`O nome da operação (${operationName}) não existe`);
    const response =
      operation.constructor.name === 'AsyncFunction'
        ? await operation(data)
        : operation(data);
    mainInterface.emit('response', response);
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
