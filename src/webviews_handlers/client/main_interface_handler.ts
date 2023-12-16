import 'dotenv/config';
import * as alt from 'alt-client';

export async function loadMainInterface() {
  const view = new alt.WebView(
    process.env.NODE_ENV === 'production'
      ? 'http://assets/webviews/interfaces/index.html'
      : 'http://localhost:5173/'
  );

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
      return alt.emitRaw(eventName, data);
    }
  );

  await new Promise((resolve) => {
    view.once('load', resolve);
  });
  view.focus();
}
