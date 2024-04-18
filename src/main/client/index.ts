import * as alt from 'alt-client';

import { setPageMode } from './utils.js';
import {
  loadMainWebView,
  toggleFocus,
  setPage,
  emitCustomEventToWebView,
} from './webview.js';
import { defaultCharacterBehaviors } from './character.js';
import { createSigninCamera } from './camera.js';

alt.on('connectionComplete', async () => {
  createSigninCamera();
  await loadMainWebView();
  setPage('signIn');
  toggleFocus(0, true);
});

alt.everyTick(() => {
  defaultCharacterBehaviors();
});

alt.on('globalMetaChange', (key, value) => {
  if (key === 'page') {
    if (value === 'mainHud') setPageMode(false);
    else setPageMode(true);
    return emitCustomEventToWebView(0, 'webView_setPage', value);
  }
});
