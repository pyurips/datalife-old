import * as alt from 'alt-client';
import * as native from 'natives';
import {
  getCursorState,
  setPageMode,
  showCursor,
  toggleNativeHud,
} from './utils.js';
import {
  webView_loadMain,
  webView_setMainPage,
  webView_emitCustomClientEventToMainWebView,
  webView_toggleMainFocus,
  webView_getCurrentMainPage,
  webView_createObjectView,
  webView_initializeMainWebViewServerEventsReceptor,
  webView_getCanChangePage,
} from './webview.js';
import { defaultCharacterBehaviors } from './character.js';
import { createSigninCamera } from './camera.js';
import {
  interaction_checkOnTap,
  interaction_initializeObjectViewBase,
  interation_check,
} from './interation.js';
import { item_initializeClearDropById } from './item.js';
import { player_emitCharacterDataToMainWebView } from './player.js';
import { vehicle_toggleEngine } from './vehicle.js';

alt.setWatermarkPosition(alt.WatermarkPosition.TopCenter);

alt.on('connectionComplete', async () => {
  toggleNativeHud(false);
  native.triggerScreenblurFadeIn(100);
  createSigninCamera();
  await interaction_initializeObjectViewBase();
  await webView_createObjectView(1);
  await webView_loadMain();
  webView_initializeMainWebViewServerEventsReceptor();
  webView_setMainPage('signIn');
  webView_toggleMainFocus(true);
  item_initializeClearDropById();
});

alt.everyTick(async () => {
  interation_check();
  defaultCharacterBehaviors();
});

alt.on('globalMetaChange', (key, value, oldValue) => {
  if (key === 'mainPage') {
    if (value === 'mainHud') {
      webView_toggleMainFocus(false);
      setPageMode(false);
    } else {
      webView_toggleMainFocus(true);
      setPageMode(true);
    }
    return webView_emitCustomClientEventToMainWebView('webView_setPage', value);
  }
});

alt.on('keyup', async (key) => {
  if (key === alt.KeyCode.M) {
    if (webView_getCurrentMainPage() !== 'mainHud') return;
    getCursorState() ? showCursor(false) : showCursor(true);
    if (getCursorState()) {
      webView_toggleMainFocus(true);
      alt.toggleGameControls(false);
    } else {
      webView_toggleMainFocus(false);
      alt.toggleGameControls(true);
    }
  }

  if (key === alt.KeyCode.B) {
    if (!webView_getCanChangePage()) return;
    if (webView_getCurrentMainPage() === 'characterMenu')
      return webView_setMainPage('mainHud');
    webView_setMainPage('characterMenu');
  }

  if (key === alt.KeyCode.F2) {
    if (!webView_getCanChangePage()) return;
    if (
      (alt.Player.local.getStreamSyncedMeta('character') as any)
        .permissionLevel < 1
    )
      return;
    if (webView_getCurrentMainPage() === 'adminPanel')
      return webView_setMainPage('mainHud');
    webView_setMainPage('adminPanel');
  }

  if (key === alt.KeyCode.K) {
    vehicle_toggleEngine();
  }

  if (key === alt.KeyCode.E) {
    const entity = interaction_checkOnTap();
    if (!entity) return;
    if (entity.hasStreamSyncedMeta('data')) {
      return webView_setMainPage('vehicleInteraction');
    }
    if (entity.hasMeta('drop')) return await alt.emitRpc('interaction_getDrop');
  }
});

alt.on('worldObjectStreamIn', async (object: any) => {
  const isADrop = object.getStreamSyncedMeta('drop');

  if (isADrop) {
    const drop = new alt.LocalObject(
      'prop_cs_box_clothes',
      object.pos,
      new alt.Vector3(0, 0, Math.random())
    );
    drop.toggleCollision(false, false);
    drop.placeOnGroundProperly();
    drop.setMeta('drop', isADrop);
  }
});

alt.on('streamSyncedMetaChange', (object, key, value, oldValue) => {
  if (object instanceof alt.Player) {
    return player_emitCharacterDataToMainWebView(key, value);
  }
});
