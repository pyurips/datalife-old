import * as alt from 'alt-client';
import { loadMainInterface } from '../utils/main_interface_handler.js';
import { setScreenMode } from '../utils/screen_mode_handler.js';
import { createSigninCamera } from '../utils/signin_camera_handler.js';

alt.on('connectionComplete', async () => {
  createSigninCamera();
  setScreenMode(true);
  await loadMainInterface();
  alt.loadModel(0x705e61f2);
  alt.loadModel(0x9c9effd8);
});
