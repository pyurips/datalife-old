import * as alt from 'alt-client';
import {
  createCustomCamera,
  destroyCustomCamera,
  pointCustomCameraAtCoord,
  renderCustomCamera,
} from './camera_handler.js';

let signinCamera: number = null;

export function createSigninCamera() {
  signinCamera = createCustomCamera(
    new alt.Vector3(-485, 1095.75, 350),
    new alt.Vector3(0, 0, 0),
    40
  );
  pointCustomCameraAtCoord(
    signinCamera,
    new alt.Vector3(402.8664, -996.4108, -98.5)
  );
  renderCustomCamera(signinCamera);
}

export function deleteSigninCamera() {
  destroyCustomCamera(signinCamera);
}
