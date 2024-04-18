import * as alt from 'alt-client';

import { setPageMode } from './utils.js';
import { loadMainWebView, toggleFocus } from './webview.js';
import { defaultCharacterBehaviors } from './character.js';

alt.on('connectionComplete', async () => {
  //CustomCamera.createSigninCamera();
  setPageMode(true);
  await loadMainWebView();
  toggleFocus(0, true);
});

alt.everyTick(() => {
  defaultCharacterBehaviors();
});
