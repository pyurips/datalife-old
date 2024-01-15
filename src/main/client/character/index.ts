import loadCreator from './load_character_creator.js';
import loadPlayerIntoWorld from './load_player_into_world.js';
import setCharacterEyeColor from './set_character_eye_color.js';
import setHair from './set_character_hair.js';
import setFaceFeatures from './set_face_features.js';
import setHeadBlend from './set_head_blend.js';
import {
  createCharacterCreatorCamera,
  toggleCreatorCameraToFace,
  deleteCharacterCreatorCamera,
} from './character_creator_camera_handler.js';

const characterOperations = {
  loadCreator,
  loadPlayerIntoWorld,
  setCharacterEyeColor,
  setHair,
  setFaceFeatures,
  setHeadBlend,
  createCharacterCreatorCamera,
  toggleCreatorCameraToFace,
  deleteCharacterCreatorCamera
};

export default characterOperations;
