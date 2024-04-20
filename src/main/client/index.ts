import * as alt from 'alt-client';

import { getCursorState, setPageMode, showCursor } from './utils.js';
import {
  loadMainWebView,
  setMainPage,
  emitCustomEventToMainWebView,
  toggleMainWebViewFocus,
  getCurrentMainPage,
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
    if (value === 'mainHud') {
      toggleMainWebViewFocus(false);
      setPageMode(false);
    } else {
      toggleMainWebViewFocus(true);
      setPageMode(true);
    }
    return emitCustomEventToMainWebView('mainWebView_setPage', value);
  }
});

alt.on('keyup', (key) => {
  if (key === 77) {
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
});
