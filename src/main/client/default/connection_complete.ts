import * as alt from 'alt-client';
import { loadMainInterface } from '../utils/main_interface_handler.js';
import { showCursor } from '../utils/cursor_handler.js';
import { setScreenMode } from '../utils/screen_mode_handler.js';
import { createSigninCamera } from '../utils/signin_camera_handler.js';

alt.on('connectionComplete', async () => {
  createSigninCamera();
  await loadMainInterface();
  showCursor(true);
  setScreenMode(true);
  alt.loadModel(0x705e61f2);
  alt.loadModel(0x9c9effd8);
});