import * as alt from 'alt-client';
import * as native from 'natives';

export class CustomCamera {
  private _position: alt.Vector3;
  private _rotation: alt.Vector3;
  private _fov: number;
  private scriptID: number;

  /**
   * Create a new camera
   *
   * @param {alt.Vector3} position Initial position of the camera
   * @param {alt.Vector3} rotation Initial rotation of the camera
   * @param {number} fov Initial field of view of the camera
   */

  constructor(position: alt.Vector3, rotation: alt.Vector3, fov: number) {
    this._position = position;
    this._rotation = rotation;
    this._fov = fov;

    this.scriptID = native.createCamWithParams(
      'DEFAULT_SCRIPTED_CAMERA',
      this._position.x,
      this._position.y,
      this._position.z,
      this._rotation.x,
      this._rotation.y,
      this._rotation.z,
      this._fov,
      true,
      0
    );
  }

  /**
   * @type {number}
   */
  get fov() {
    return this._fov;
  }

  set fov(value) {
    this._fov = value;
    native.setCamFov(this.scriptID, this._fov);
    this.render();
  }

  /**
   * @type {alt.Vector3}
   */
  get position() {
    return this._position;
  }

  set position(position) {
    this._position = position;
    native.setCamCoord(
      this.scriptID,
      this._position.x,
      this._position.y,
      this._position.z
    );
    this.render();
  }

  /**
   * @type {alt.Vector3}
   */
  get rotation() {
    return this._rotation;
  }

  set rotation(rotation) {
    this._rotation = rotation;
    native.setCamRot(
      this.scriptID,
      this._rotation.x,
      this._rotation.y,
      this._rotation.z,
      0
    );
    this.render();
  }

  /**
   * Stops rendering the camera on the screen
   * @param {alt.Vector3} easeTime Time in milliseconds for the transition to happen
   */
  unrender(easeTime?: number) {
    native.renderScriptCams(
      false,
      false,
      easeTime ? easeTime : 0,
      false,
      false,
      null
    );
  }

  /**
   * Renders the camera view on the screen
   * * @param {alt.Vector3} easeTime Time in milliseconds for the transition to happen
   */
  render(easeTime?: number) {
    native.setCamActive(this.scriptID, true);
    native.renderScriptCams(
      true,
      false,
      easeTime ? easeTime : 0,
      true,
      false,
      null
    );
  }

  /**
   * Destroys the camera
   */
  destroy() {
    native.destroyCam(this.scriptID, false);
    this.unrender();

    alt.log(`--> Destroyed camera: ${this.scriptID}`);
  }

  /**
   * Rotates camera so it points straight to a ped's specific bone
   *
   * @param {number} entity Ped handle that owns the bone
   * @param {number} bone Bone index
   * @param {number} xOffset Position offset of the camera X
   * @param {number} yOffset Position offset of the camera Y
   * @param {number} zOffset Position offset of the camera Z
   */
  pointAtBone(
    entity: number | alt.Player,
    bone: number,
    xOffset: number,
    yOffset: number,
    zOffset: number
  ) {
    native.pointCamAtPedBone(
      this.scriptID,
      entity,
      bone,
      xOffset,
      yOffset,
      zOffset,
      false
    );
    this.render();
  }

  /**
   * Rotates camera so it points straight to a position
   *
   * @param {alt.Vector3} position Vector3 to where to point the camera at
   */
  pointAtCoord(position: alt.Vector3) {
    native.pointCamAtCoord(this.scriptID, position.x, position.y, position.z);
    this.render();
  }
}