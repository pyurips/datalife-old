import * as alt from 'alt-client';
import * as native from 'natives';
import {
  getCursorState,
  getDistanceBetween,
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
  webView_attachObjectViewTo,
} from './webview.js';
import { defaultCharacterBehaviors } from './character.js';
import { createSigninCamera } from './camera.js';
import {
  OBJECT_view_BASE,
  interaction_initializeObjectViewBase,
  interation_check,
} from './interation.js';

alt.setWatermarkPosition(alt.WatermarkPosition.TopCenter);

alt.on('connectionComplete', async () => {
  toggleNativeHud(false);
  native.triggerScreenblurFadeIn(100);
  createSigninCamera();
  await interaction_initializeObjectViewBase();
  await createObjectView(1);
  await loadMainWebView();
  initializeMainWebViewServerEventsReceptor();
  setMainPage('signIn');
  toggleMainWebViewFocus(true);
});

alt.everyTick(async () => {
  //interation_check();
  defaultCharacterBehaviors();
});

alt.on('globalMetaChange', (key, value, oldValue) => {
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

  if (key === 'closestInteractionEntity') {
    if (!value || !oldValue) return;
    if (value.id === oldValue.id && value.type === oldValue.type) return;
    if (value instanceof alt.Vehicle || value instanceof alt.Object) {
      alt.log(
        `ID: ${value.id} | Type: ${value.type} | VALID: ${value.valid} | POS: ${value.pos}`
      );
      webView_attachObjectViewTo(1, value);
    }
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
    drop.toggleCollision(false, false);
    drop.placeOnGroundProperly();
    drop.setMeta('virtualEntityId', isADrop.virtualEntityId);
  }
});

setInterval(() => {
  interation_check();

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
