import * as alt from 'alt-client';

export async function loadMainInterface() {
  const view = new alt.WebView('http://assets/webviews/interfaces/index.html');

  alt.onServer('emitToWebView', (eventName: string, ...args) => {
    view.emit(eventName, ...args);
  });

  alt.on('emitToWebView', (eventName: string, ...args) => {
    view.emit(eventName, ...args);
  });

  view.on('emitTo', (eventType: string, eventName: string, ...args) => {
    if (eventType === 'server') {
      alt.emitServerRaw(eventName, ...args);
    } else {
      alt.emit(eventName, ...args);
    }
  });

  await new Promise((resolve) => {
    view.once('load', resolve);
  });
  view.focus();
}
