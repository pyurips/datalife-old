import * as alt from 'alt-client';

export async function loadUtilsWebView() {
  let view: alt.WebView;
  view = new alt.WebView('http://assets/webviews/test_example/index.html');
  await new Promise((resolve: (...args: any[]) => void) => {
    view.once('load', resolve);
  });
  view.focus();
}
