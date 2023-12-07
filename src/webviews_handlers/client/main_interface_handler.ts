import * as alt from 'alt-client';

export async function loadMainInterface() {
  const view = new alt.WebView('http://assets/webviews/interfaces/index.html');

  alt.onServer('emitToWebView', (eventName: string, data) => {
    view.emit(eventName, data);
  });

  alt.on('emitToWebView', (eventName: string, data) => {
    view.emit(eventName, data);
  });

  view.on(
    'emitTo',
    (eventType: 'server' | 'client', eventName: string, data) => {
      if (eventType === 'server') return alt.emitServerRaw(eventName, data);
      return alt.emit(eventName, data);
    }
  );

  await new Promise((resolve) => {
    view.once('load', resolve);
  });
  view.focus();
}
