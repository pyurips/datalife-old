import * as alt from 'alt-client';
import { loadMainInterface } from '../utils/main_interface_handler.js';
import { setScreenMode } from '../utils/screen_mode_handler.js';
import { createSigninCamera } from '../utils/signin_camera_handler.js';

alt.on('connectionComplete', async () => {
  createSigninCamera();
  setScreenMode(true);
  await loadMainInterface();
  await alt.emitRpc('rpc', 'loadPlayerIntoWorld');
});
