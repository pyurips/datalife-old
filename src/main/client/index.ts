import * as alt from 'alt-client';

import { setPageMode } from './utils.js';
import {
  loadMainWebView,
  setMainPage,
  emitCustomEventToMainWebView,
  toggleMainWebViewFocus,
} from './webview.js';
import { defaultCharacterBehaviors } from './character.js';
import { createSigninCamera } from './camera.js';
import { checkInteraction, getCanInteract } from './interation.js';

alt.on('connectionComplete', async () => {
  createSigninCamera();
  await loadMainWebView();
  setMainPage('signIn');
  toggleMainWebViewFocus(true);
});

alt.everyTick(() => {
  if (getCanInteract()) checkInteraction();
  defaultCharacterBehaviors();
});

alt.on('globalMetaChange', (key, value) => {
  if (key === 'mainPage') {
    if (value === 'mainHud') setPageMode(false);
    else setPageMode(true);
    return emitCustomEventToMainWebView('mainWebView_setPage', value);
  }
});
