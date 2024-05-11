import * as alt from 'alt-client';
import * as native from 'natives';

import vehicle from './vehicle.js';
import auth from './auth.js';
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

const OPERATIONS = {
  ...vehicle,
  ...auth,
};

export async function webView_loadMain() {
  const webView = new alt.WebView(webViews[0], false);
  await webView_loadRequester(webView);
  mainWebView = webView;
}

export function webView_toggleMainFocus(state: boolean) {
  if (state) return mainWebView.focus();
  return mainWebView.unfocus();
}

export function webView_toggleObjectViewFocus(webViewId: number, state: boolean) {
  if (state)
    return activeObjectViews.find((e) => e.id === webViewId).webView.focus();
  return activeObjectViews.find((e) => e.id === webViewId).webView.unfocus();
}

export async function webView_createObjectView(webViewId: number) {
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
  await webView_loadRequester(webView);
  activeObjectViews.push({
    id: webViewId,
    webView,
    object,
  });
}

export function webView_destroyObjectView(webViewId: number) {
  const view = activeObjectViews.find((e) => e.id === webViewId);
  if (!view) return;
  if (view?.object) view.object.destroy();
  if (view) view.webView.destroy();
  activeObjectViews = activeObjectViews.filter((e) => e.id !== webViewId);
}

export function webView_setObjectViewPos(webViewId: number, pos: alt.Vector3) {
  const view = activeObjectViews.find((e) => e.id === webViewId);
  if (view) view.object.pos = pos;
}

async function webView_loadRequester(webView: alt.WebView) {
  webView.on('request', async (operation: string, data?: unknown) => {
    try {
      const response = await OPERATIONS[operation](data);
      webView.emit(`response:${operation}`, response);
    } catch (error) {
      webView.emit(`response:${operation}`, {
        error,
      });
    }
  });
  await new Promise((resolve) => {
    webView.once('load', resolve);
  });
}

export function webView_setMainPage(
  page: 'signIn' | 'mainHud' | 'characterMenu' | 'adminPanel'
) {
  alt.setMeta('mainPage', page);
}

export function webView_canChangePage(state: boolean) {
  alt.setMeta('canChangePage', state);
}

export function webView_getCanChangePage() {
  return alt.getMeta('canChangePage') as boolean;
}

export function webView_getCurrentMainPage() {
  return alt.getMeta('mainPage') as
    | 'signIn'
    | 'mainHud'
    | 'characterMenu'
    | 'adminPanel';
}

export function webView_initializeMainWebViewServerEventsReceptor() {
  alt.onServer(
    'emitCustomServerEventToMainWebView',
    (event: string, data?: unknown) => {
      mainWebView.emit(event, data);
    }
  );
}

export function webView_emitCustomClientEventToMainWebView(
  event: string,
  data?: unknown
) {
  mainWebView.emit(event, data);
}

export function webView_emitCustomEventToObjectView(
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
  if (!objectView) return;
  if (!objectView.object) return;

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
