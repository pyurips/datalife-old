import * as alt from 'alt-client';
import {
  createCustomCamera,
  destroyCustomCamera,
  renderCustomCamera,
} from './camera_handler.js';

let characterCreatorCamera: number = null;

export function createCharacterCreatorCamera() {
  characterCreatorCamera = createCustomCamera(
    new alt.Vector3(-762.6678, 327.4897, 199.3864),
    new alt.Vector3(0, 0, -3.0605),
    40
  );
  renderCustomCamera(characterCreatorCamera);
}

export function deleteCharacterCreatorCamera() {
  destroyCustomCamera(characterCreatorCamera);
}
