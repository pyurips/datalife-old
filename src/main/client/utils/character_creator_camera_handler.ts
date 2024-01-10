import * as alt from 'alt-client';
import {
  createCustomCamera,
  destroyCustomCamera,
  renderCustomCamera,
  setPositionCustomCamera,
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

export function toggleCreatorCameraToFace(state: boolean) {
  if (state)
    return setPositionCustomCamera(
      characterCreatorCamera,
      -763.000,
      329.5897,
      200.0864
    );

  return setPositionCustomCamera(
    characterCreatorCamera,
    -762.6678,
    327.4897,
    199.3864
  );
}

export function deleteCharacterCreatorCamera() {
  destroyCustomCamera(characterCreatorCamera);
}
