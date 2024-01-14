import * as alt from 'alt-client';
import { setScreenMode } from '../utils/screen_mode_handler.js';
import { deleteSigninCamera } from '../utils/signin_camera_handler.js';
import { createCharacterCreatorCamera } from '../utils/character_creator_camera_handler.js';
import toggleNativeHudHandler from '../utils/toggle_native_hud_handler.js';

alt.onServer('request:character_loadCreator', () => {
  const player = alt.Player.local;
  alt.requestIpl('apa_v_mp_h_01_b');
  player.pos = new alt.Vector3(-763.17, 330.59, 199.49);
  player.rot = new alt.Vector3(0, 0, -3.06);
  setScreenMode(false);
  deleteSigninCamera();
  alt.setMeta('currentScreen', 'characterCreator');
  createCharacterCreatorCamera();
  toggleNativeHudHandler(false, true, false);
});
