import * as alt from 'alt-client';
import { setScreenMode } from '../utils/screen_mode_handler.js';
import { deleteSigninCamera } from '../utils/signin_camera_handler.js';
import { createCharacterCreatorCamera } from './character_creator_camera_handler.js';
import toggleNativeHudHandler from '../utils/toggle_native_hud_handler.js';
import { createPedInCreator } from './ped_in_creator_handler.js';

function loadCreator() {
  const player = alt.Player.local;
  alt.requestIpl('apa_v_mp_h_01_b');
  player.pos = new alt.Vector3(-764.799, 322.088, 199.486);
  createPedInCreator();
  setScreenMode(false);
  deleteSigninCamera();
  alt.setMeta('currentScreen', 'characterCreator');
  createCharacterCreatorCamera();
  toggleNativeHudHandler(false, true, false);
}

export default loadCreator;
