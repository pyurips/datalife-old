import loadCreator from './load_character_creator.js';
import loadPlayerIntoWorld from './load_player_into_world.js';
import {
  createCharacterCreatorCamera,
  toggleCreatorCameraToFace,
  deleteCharacterCreatorCamera,
} from './character_creator_camera_handler.js';
import {
  setPedInCreatorModel,
  setPedInCreatorHeadBlend,
  setPedInCreatorMicroMorph,
  setPedInCreatorEyeColor,
  setPedInCreatorHairColors,
  setPedInCreatorHairModel,
  rotatePedInCreator
} from './ped_in_creator_handler.js';
import createACharacter from './create_a_character.js';

const characterOperations = {
  loadCreator,
  loadPlayerIntoWorld,
  createCharacterCreatorCamera,
  toggleCreatorCameraToFace,
  deleteCharacterCreatorCamera,
  setPedInCreatorModel,
  setPedInCreatorHeadBlend,
  setPedInCreatorMicroMorph,
  setPedInCreatorEyeColor,
  setPedInCreatorHairColors,
  setPedInCreatorHairModel,
  rotatePedInCreator,
  createACharacter
};

export default characterOperations;
