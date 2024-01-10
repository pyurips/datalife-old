import * as alt from 'alt-client';
import { toggleCreatorCameraToFace } from '../utils/character_creator_camera_handler.js';

alt.on('request:character_toggleCreatorCameraToFace', (state: boolean) => {
  toggleCreatorCameraToFace(state);
});
