import * as alt from 'alt-client';

export async function loadMainInterface() {
  const view = new alt.WebView('http://assets/webviews/interfaces/index.html');
  await new Promise((resolve) => {
    view.once('load', resolve);
  });
  view.focus();
}
