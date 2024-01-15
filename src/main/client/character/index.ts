import loadCreator from './load_character_creator';
import loadPlayerIntoWorld from './load_player_into_world';
import setCharacterEyeColor from './set_character_eye_color';
import setHair from './set_character_hair';
import setFaceFeatures from './set_face_features';
import setHeadBlend from './set_head_blend';
import {
  createCharacterCreatorCamera,
  toggleCreatorCameraToFace,
  deleteCharacterCreatorCamera,
} from './character_creator_camera_handler';

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
