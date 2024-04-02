import * as alt from 'alt-client';
import requester from './requester.js';

class Webview {
  static webViews = ['http://assets/webviews/main_interface/index.html'];
  static activeWebViews: { id: number; webView: alt.WebView }[] = [];

  static async loadWebView(WebviewId: number, isOverlay = false) {
    const webView = new alt.WebView(this.webViews[WebviewId], isOverlay);

    webView.on('request', async (operationName: string, data?: unknown) => {
      try {
        const response = await requester(operationName, data);
        webView.emit(`response:${operationName}`, response);
      } catch (error) {
        webView.emit(`response:${operationName}`, {
          error,
        });
      }
    });

    await new Promise((resolve) => {
      webView.once('load', resolve);
    });

    this.activeWebViews.push({ id: WebviewId, webView });
  }

  static toggleFocus(webViewId: number, state: boolean) {
    if (state)
      return this.activeWebViews
        .find((e) => e.id === webViewId)
        .webView.focus();
    return this.activeWebViews
      .find((e) => e.id === webViewId)
      .webView.unfocus();
  }
}

export default Webview;
