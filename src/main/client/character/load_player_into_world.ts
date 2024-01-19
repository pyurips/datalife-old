import * as alt from 'alt-client';
import { deleteCharacterCreatorCamera } from './character_creator_camera_handler.js';
import { deleteSigninCamera } from '../utils/signin_camera_handler.js';
import toggleNativeHudHandler from '../utils/toggle_native_hud_handler.js';
import { setScreenMode } from '../utils/screen_mode_handler.js';
import { deletePedInCreator } from './ped_in_creator_handler.js';

async function loadPlayerIntoWorld() {
  deleteCharacterCreatorCamera();
  deleteSigninCamera();
  deletePedInCreator();
  alt.removeIpl('apa_v_mp_h_01_b');
  alt.setMeta('currentScreen', 'hud');
  setScreenMode(false);
  toggleNativeHudHandler(true, false, true);
  await alt.emitRpc('rpc', 'loadPlayerIntoWorld');
}

export default loadPlayerIntoWorld;
