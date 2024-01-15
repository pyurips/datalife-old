import * as alt from 'alt-client';
import { deleteCharacterCreatorCamera } from './character_creator_camera_handler.js';
import { deleteSigninCamera } from '../utils/signin_camera_handler.js';
import toggleNativeHudHandler from '../utils/toggle_native_hud_handler.js';

async function loadPlayerIntoWorld() {
  deleteCharacterCreatorCamera();
  deleteSigninCamera();
  alt.removeIpl('apa_v_mp_h_01_b');
  alt.setMeta('currentScreen', 'hud');
  toggleNativeHudHandler(true, false, true);
  await alt.emitRpc('rpc', 'loadPlayerIntoWorld');
}

export default loadPlayerIntoWorld;