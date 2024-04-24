import * as alt from 'alt-client';
import * as native from 'natives';
import {
  getCursorState,
  setPageMode,
  showCursor,
  toggleNativeHud,
} from './utils.js';
import {
  loadMainWebView,
  setMainPage,
  emitCustomClientEventToMainWebView,
  toggleMainWebViewFocus,
  getCurrentMainPage,
  createObjectView,
  initializeMainWebViewServerEventsReceptor,
  getCanChangePage,
} from './webview.js';
import { defaultCharacterBehaviors } from './character.js';
import { createSigninCamera } from './camera.js';
import { checkInteraction } from './interation.js';

alt.setWatermarkPosition(alt.WatermarkPosition.TopCenter);

alt.on('connectionComplete', async () => {
  toggleNativeHud(false);
  native.triggerScreenblurFadeIn(100);
  createSigninCamera();
  await loadMainWebView();
  await createObjectView(1);
  initializeMainWebViewServerEventsReceptor();
  setMainPage('signIn');
  toggleMainWebViewFocus(true);
});

alt.everyTick(() => {
  checkInteraction();
  defaultCharacterBehaviors();
});

alt.on('globalMetaChange', (key, value) => {
  if (key === 'mainPage') {
    if (value === 'mainHud') {
      toggleMainWebViewFocus(false);
      setPageMode(false);
    } else {
      toggleMainWebViewFocus(true);
      setPageMode(true);
    }
    return emitCustomClientEventToMainWebView('client_setPage', value);
  }
});

alt.on('keyup', async (key) => {
  if (key === alt.KeyCode.M) {
    if (getCurrentMainPage() !== 'mainHud') return;
    getCursorState() ? showCursor(false) : showCursor(true);
    if (getCursorState()) {
      toggleMainWebViewFocus(true);
      alt.toggleGameControls(false);
    } else {
      toggleMainWebViewFocus(false);
      alt.toggleGameControls(true);
    }
  }

  if (key === alt.KeyCode.B) {
    if (!getCanChangePage()) return;
    if (getCurrentMainPage() === 'characterMenu') return setMainPage('mainHud');
    setMainPage('characterMenu');
  }

  if (key === alt.KeyCode.K) {
    await alt.emitRpc('rpc', 'vehicle_toggleEngine');
  }
});

alt.on('worldObjectStreamIn', (object: any) => {
  const isADrop = object.getStreamSyncedMeta('drop');

  if (isADrop) {
    const drop = new alt.LocalObject(
      'prop_cs_box_clothes',
      object.pos,
      new alt.Vector3(0, 0, Math.random())
    );
    drop.positionFrozen = true;
    drop.frozen = true;
    drop.toggleCollision(false, false);
    drop.setMeta('virtualEntityId', isADrop.virtualEntityId);
  }
});

setInterval(() => {
  alt.LocalObject.all.forEach(async (object) => {
    if (!object?.valid) return;
    const virtualEntityId = object.getMeta('virtualEntityId');
    if (!virtualEntityId) return;
    const objectExistYet = await alt.emitRpc(
      'rpc',
      'item_getObjectDrop',
      virtualEntityId
    );
    if (!objectExistYet) object.destroy();
  });
}, 1_000);
