import * as alt from 'alt-client';
import * as native from 'natives';
import requester from './requester.js';

class Webview {
  static webViews = [
    'http://assets/webviews/main_interface/index.html',
    'http://assets/webviews/vehicle_status_interface/index.html',
  ];
  static activeWebViews: { id: number; webView: alt.WebView }[] = [];

  static async loadWebView(WebviewId: number, isOverlay = false) {
    const webView = new alt.WebView(Webview.webViews[WebviewId], isOverlay);

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

    Webview.activeWebViews.push({ id: WebviewId, webView });
  }

  static toggleFocus(webViewId: number, state: boolean) {
    if (state)
      return Webview.activeWebViews
        .find((e) => e.id === webViewId)
        .webView.focus();
    return Webview.activeWebViews
      .find((e) => e.id === webViewId)
      .webView.unfocus();
  }

  static async createObjectView(
    webViewId: number,
    pos: alt.Vector3,
    rot: alt.Vector3
  ) {
    const object = new alt.LocalObject('prop_tv_flat_01_screen', pos, rot);
    object.alpha = 240;
    const webView = new alt.WebView(
      Webview.webViews[webViewId],
      object.model,
      'script_rt_tvscreen'
    );

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

    Webview.activeWebViews.push({ id: webViewId, webView });
  }
}

export default Webview;
