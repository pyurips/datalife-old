import * as alt from 'alt-client';
import * as native from 'natives';

import { callableByRPC as cameraRPC } from './camera.js';
import { callableByRPC as authRPC } from './auth.js';
import { OBJECT_view_BASE } from './interation.js';

const webViews = [
  'http://assets/webviews/main_interface/index.html',
  'http://assets/webviews/interactions_interface/index.html',
];

let activeObjectViews: {
  id: number;
  webView: alt.WebView;
  object: alt.LocalObject;
}[] = [];

let mainWebView: alt.WebView = null;

export async function loadMainWebView() {
  const webView = new alt.WebView(webViews[0], false);
  await loadWebViewRequester(webView);
  mainWebView = webView;
}

export function toggleMainWebViewFocus(state: boolean) {
  if (state) return mainWebView.focus();
  return mainWebView.unfocus();
}

export function toggleFocus(webViewId: number, state: boolean) {
  if (state)
    return activeObjectViews.find((e) => e.id === webViewId).webView.focus();
  return activeObjectViews.find((e) => e.id === webViewId).webView.unfocus();
}

export async function createObjectView(webViewId: number) {
  const object = new alt.LocalObject(
    'prop_tv_flat_01_screen',
    new alt.Vector3(0, 0, 0),
    new alt.Vector3(0, 0, 0)
  );
  await alt.Utils.requestModel(object.model);
  object.alpha = 240;
  object.toggleCollision(false, false);
  object.attachToEntity(
    OBJECT_view_BASE,
    -1,
    new alt.Vector3(0, 0, 0),
    new alt.Vector3(0, 0, 0)
  );
  const webView = new alt.WebView(
    webViews[webViewId],
    object.model,
    'script_rt_tvscreen'
  );
  await loadWebViewRequester(webView);
  activeObjectViews.push({
    id: webViewId,
    webView,
    object,
  });
}

export function destroyObjectView(webViewId: number) {
  const view = activeObjectViews.find((e) => e.id === webViewId);
  if (!view) return;
  if (view?.object) view.object.destroy();
  if (view) view.webView.destroy();
  activeObjectViews = activeObjectViews.filter((e) => e.id !== webViewId);
}

export function setObjectViewPos(webViewId: number, pos: alt.Vector3) {
  const view = activeObjectViews.find((e) => e.id === webViewId);
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

export function setMainPage(page: 'signIn' | 'mainHud' | 'characterMenu') {
  alt.setMeta('mainPage', page);
}

export function canChangePage(state: boolean) {
  alt.setMeta('canChangePage', state);
}

export function getCanChangePage() {
  return alt.getMeta('canChangePage') as boolean;
}

export function getCurrentMainPage() {
  return alt.getMeta('mainPage') as 'signIn' | 'mainHud' | 'characterMenu';
}

export function initializeMainWebViewServerEventsReceptor() {
  alt.onServer(
    'emitCustomServerEventToMainWebView',
    (event: string, data?: unknown) => {
      mainWebView.emit(event, data);
    }
  );
}

export function emitCustomClientEventToMainWebView(
  event: string,
  data?: unknown
) {
  mainWebView.emit(event, data);
}

export function emitCustomEventToObjectView(
  webViewId: number,
  event: string,
  data?: unknown
) {
  const view = activeObjectViews.find((e) => e.id === webViewId);
  if (view) view.webView.emit(event, data);
}

export function webView_attachObjectViewTo(
  objectViewId: number,
  entity: alt.Entity
) {
  const objectView = activeObjectViews.find((e) => e.id === objectViewId);
  if (objectView) {
    const cameraPos = native.getGameplayCamCoord();
    const tvPos = objectView.object.pos;
    const direction = new alt.Vector3(
      cameraPos.x - tvPos.x,
      cameraPos.y - tvPos.y,
      0
    ).normalize();
    const rotationZ = Math.atan2(direction.y, direction.x) + Math.PI / 2;

    objectView.object.attachToEntity(
      entity,
      -1,
      new alt.Vector3(0, 0, 1.5),
      new alt.Vector3(0, 0, rotationZ)
    );
  }
}
