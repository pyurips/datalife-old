import * as alt from 'alt-client';

export async function loadMainInterface() {
  const view = new alt.WebView('http://assets/webviews/interfaces/index.html');

  alt.onServer('emitToWebView', (eventName: string, ...args) => {
    view.emit(eventName, ...args);
  });

  alt.on('emitToWebView', (eventName: string, ...args) => {
    view.emit(eventName, ...args);
  });

  view.on(
    'emitTo',
    (eventType: string, eventName: 'server' | 'client', ...args) => {
      if (eventType === 'server') return alt.emitServerRaw(eventName, ...args);
      return alt.emit(eventName, ...args);
    }
  );

  await new Promise((resolve) => {
    view.once('load', resolve);
  });
  view.focus();
}
