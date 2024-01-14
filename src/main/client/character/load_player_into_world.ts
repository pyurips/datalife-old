import * as alt from 'alt-client';
import { deleteCharacterCreatorCamera } from '../utils/character_creator_camera_handler.js';
import { deleteSigninCamera } from '../utils/signin_camera_handler.js';
import toggleNativeHudHandler from '../utils/toggle_native_hud_handler.js';
import { emitter } from '../utils/cevents.js';

alt.on('request:character_loadPlayerIntoWorld', () => {
  const player = alt.Player.local;
  deleteCharacterCreatorCamera();
  deleteSigninCamera();
  alt.removeIpl('apa_v_mp_h_01_b');
  alt.setMeta('currentScreen', 'hud');
  toggleNativeHudHandler(true, false, true);
  emitter('server', 'request', 'character_loadPlayerIntoWorld');
});
