import * as alt from 'alt-client';

export class MainInterface {
  constructor() {
    this.initialize();
  }

  async initialize() {
    let view = new alt.WebView('http://assets/webviews/auth/index.html');
    await new Promise((resolve) => {
      view.once('load', resolve);
    });
    view.focus();
  }
}
