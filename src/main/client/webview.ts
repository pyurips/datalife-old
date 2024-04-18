import * as alt from 'alt-client';
import * as native from 'natives';

import { callableByRPC as cameraRPC } from './camera.js';
import { callableByRPC as authRPC } from './auth.js';

const webViews = [
  'http://assets/webviews/main_interface/index.html',
  'http://assets/webviews/vehicle_status_interface/index.html',
];

let activeWebViews: {
  id: number;
  webView: alt.WebView;
  camAngleInterval?: number;
  object?: alt.LocalObject;
}[] = [];

export async function loadMainWebView() {
  const webView = new alt.WebView(webViews[0], false);
  await loadWebViewRequester(webView);
  activeWebViews.push({ id: 0, webView });
}

export function toggleFocus(webViewId: number, state: boolean) {
  if (state)
    return activeWebViews.find((e) => e.id === webViewId).webView.focus();
  return activeWebViews.find((e) => e.id === webViewId).webView.unfocus();
}

export async function createObjectView(webViewId: number) {
  const object = new alt.LocalObject(
    'prop_tv_flat_01_screen',
    new alt.Vector3(0, 0, 0),
    new alt.Vector3(0, 0, 0)
  );
  object.alpha = 240;
  object.toggleCollision(false, false);
  const webView = new alt.WebView(
    webViews[webViewId],
    object.model,
    'script_rt_tvscreen'
  );
  await loadWebViewRequester(webView);
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
  activeWebViews.push({
    id: webViewId,
    webView,
    camAngleInterval,
    object,
  });
}

export function destroyObjectView(webViewId: number) {
  const view = activeWebViews.find((e) => e.id === webViewId);
  if (!view) return;
  if (view?.camAngleInterval) alt.clearEveryTick(view.camAngleInterval);
  if (view?.object) view.object.destroy();
  if (view) view.webView.destroy();
  activeWebViews = activeWebViews.filter((e) => e.id !== webViewId);
}

export function setObjectViewPos(webViewId: number, pos: alt.Vector3) {
  const view = activeWebViews.find((e) => e.id === webViewId);
  if (view) view.object.pos = pos;
}

async function loadWebViewRequester(webView: alt.WebView) {
  webView.on(
    'request',
    async (to: 'server' | 'client', operation: string, data?: unknown) => {
      try {
        const currentOperation = { ...authRPC, ...cameraRPC };
        let response = null;
        if (to === 'client') {
          response = await currentOperation[operation](data);
        } else {
          response = await alt.emitRpc('rpc', operation, data);
        }
        webView.emit(`response:${operation}`, response);
      } catch (error) {
        webView.emit(`response:${operation}`, {
          error,
        });
      }
    }
  );
  await new Promise((resolve) => {
    webView.once('load', resolve);
  });
}

export function setPage(page: 'signIn' | 'mainHud') {
  alt.setMeta('page', page);
}

export function emitCustomEventToWebView(
  webViewId: number,
  event: string,
  data?: unknown
) {
  const view = activeWebViews.find((e) => e.id === webViewId);
  if (view) view.webView.emit(event, data);
}
