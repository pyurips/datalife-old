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
import {
  interaction_checkOnTap,
  interaction_initializeObjectViewBase,
  interation_check,
} from './interation.js';
import { item_initializeClearDropById } from './item.js';
import { player_emitCharacterDataToMainWebView } from './player.js';

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
  item_initializeClearDropById();
});

alt.everyTick(async () => {
  interation_check();
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

  if (key === alt.KeyCode.F2) {
    if (!getCanChangePage()) return;
    if ((alt.getLocalMeta('account') as any).permissionLevel < 1) return;
    if (getCurrentMainPage() === 'adminPanel') return setMainPage('mainHud');
    setMainPage('adminPanel');
  }

  if (key === alt.KeyCode.K) {
    const player = alt.Player.local;
    if (!player?.valid) return;
    if (!player.vehicle) return;
    await alt.emitRpc('rpc', 'vehicle_toggleEngine');
  }

  if (key === alt.KeyCode.E) {
    const entity = interaction_checkOnTap();
    if (!entity) return;
    if (entity.type === 1 && entity.hasStreamSyncedMeta('data')) {
      alt.log(entity.getStreamSyncedMeta('data'));
    }
    await alt.emitRpc('rpc', 'interaction_check');
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
    drop.setMeta('virtualEntityId', isADrop.virtualEntityId);
  }
});

alt.on('streamSyncedMetaChange', (object, key, value, oldValue) => {
  if (object instanceof alt.Player) {
    return player_emitCharacterDataToMainWebView(key, value);
  }
});
