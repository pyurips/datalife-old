import * as alt from 'alt-client';
import * as native from 'natives';
import requester from './requester.js';

class Webview {
  static webViews = [
    'http://assets/webviews/main_interface/index.html',
    'http://assets/webviews/vehicle_status_interface/index.html',
  ];
  static activeWebViews: {
    id: number;
    webView: alt.WebView;
    camAngleInterval?: number;
  }[] = [];

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
    object.toggleCollision(false, false);
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
    const camAngleInterval = alt.everyTick(() => {
      const cameraPos = native.getGameplayCamCoord();
      const tvPos = object.pos;
      const direction = new alt.Vector3(
        cameraPos.x - tvPos.x,
        cameraPos.y - tvPos.y,
        0
      ).normalize();
      const rotationZ = Math.atan2(direction.y, direction.x) + Math.PI / 2;
      object.rot = new alt.Vector3(0, 0, rotationZ);
    });
    Webview.activeWebViews.push({ id: webViewId, webView, camAngleInterval });
  }

  static destroyObjectView(webViewId: number) {
    const view = Webview.activeWebViews.find((e) => e.id === webViewId);
    if (view?.camAngleInterval) alt.clearEveryTick(view.camAngleInterval);
    if (view) view.webView.destroy();
    Webview.activeWebViews = Webview.activeWebViews.filter(
      (e) => e.id !== webViewId
    );
  }
}

export default Webview;
