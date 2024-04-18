import * as alt from 'alt-client';
import * as native from 'natives';

export let position: alt.Vector3 = new alt.Vector3(0, 0, 0);
export let rotation: alt.Vector3 = new alt.Vector3(0, 0, 0);
export let fov: number = 0;
export let scriptID: number = 0;

/**
 * Create a new camera
 *
 * @param {alt.Vector3} initialPosition Initial position of the camera
 * @param {alt.Vector3} initialRotation Initial rotation of the camera
 * @param {number} initialFov Initial field of view of the camera
 */
export function camera_create(
  initialPosition: alt.Vector3,
  initialRotation: alt.Vector3,
  initialFov: number
) {
  position = initialPosition;
  rotation = initialRotation;
  fov = initialFov;

  scriptID = native.createCamWithParams(
    'DEFAULT_SCRIPTED_CAMERA',
    position.x,
    position.y,
    position.z,
    rotation.x,
    rotation.y,
    rotation.z,
    fov,
    true,
    0
  );
}

/**
 * Change the field of view of the camera
 *
 * @param {number} value New field of view value
 */
export function camera_setFov(value: number) {
  fov = value;
  native.setCamFov(scriptID, fov);
  camera_render();
}

/**
 * Change the position of the camera
 *
 * @param {alt.Vector3} newPosition New position of the camera
 */
export function camera_setPosition(newPosition: alt.Vector3) {
  position = newPosition;
  native.setCamCoord(scriptID, position.x, position.y, position.z);
  camera_render();
}

/**
 * Change the rotation of the camera
 *
 * @param {alt.Vector3} newRotation New rotation of the camera
 */
export function camera_setRotation(newRotation: alt.Vector3) {
  rotation = newRotation;
  native.setCamRot(scriptID, rotation.x, rotation.y, rotation.z, 0);
  camera_render();
}

/**
 * Stops rendering the camera on the screen
 *
 * @param {number} easeTime Time in milliseconds for the transition to happen
 */
export function camera_unrender(easeTime?: number) {
  native.renderScriptCams(
    false,
    false,
    easeTime ? easeTime : 0,
    false,
    false,
    0
  );
}

/**
 * Renders the camera view on the screen
 *
 * @param {number} easeTime Time in milliseconds for the transition to happen
 */
export function camera_render(easeTime?: number) {
  native.setCamActive(scriptID, true);
  native.renderScriptCams(true, false, easeTime ? easeTime : 0, true, false, 0);
}

/**
 * Destroys the camera
 */
export function camera_destroy() {
  native.destroyCam(scriptID, false);
  camera_unrender();
}

/**
 * Rotates camera so it points straight to a position
 *
 * @param {alt.Vector3} position Vector3 to where to point the camera at
 */
export function camera_pointAtCoord(position: alt.Vector3) {
  native.pointCamAtCoord(scriptID, position.x, position.y, position.z);
  camera_render();
}

export const callableByRPC = {
  camera_create,
  camera_setFov,
  camera_setPosition,
  camera_setRotation,
  camera_unrender,
  camera_render,
  camera_destroy,
  camera_pointAtCoord,
};
