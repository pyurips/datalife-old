import * as alt from 'alt-client';
import {
  createCustomCamera,
  renderCustomCamera,
  destroyCustomCamera,
  setPositionCustomCamera,
  setRotCustomCamera,
  // @ts-ignore
} from 'alt:utils';

let currentDebugCamera = null;
let currentDebugCamCoords = null;
let currentDebugCamRot = null;

alt.on('request:debug_initializeDebugCam', () => {
  const player = alt.Player.local;
  currentDebugCamCoords = new alt.Vector3(
    player.pos.x,
    player.pos.y,
    player.pos.z
  );
  currentDebugCamRot = new alt.Vector3(
    player.rot.x,
    player.rot.y,
    player.rot.z
  );
  currentDebugCamera = createCustomCamera(
    currentDebugCamCoords,
    currentDebugCamRot,
    40
  );
  renderCustomCamera(currentDebugCamera);
});

alt.on('request:debug_unrenderDebugCam', () => {
  alt.log(currentDebugCamera);
  if (currentDebugCamera) destroyCustomCamera(currentDebugCamera);
});

alt.on('request:debug_setDebugCamX', (step: number) => {
  setPositionCustomCamera(
    currentDebugCamera,
    currentDebugCamCoords.x + step,
    currentDebugCamCoords.y,
    currentDebugCamCoords.z
  );
});

alt.on('request:debug_setDebugCamY', (step: number) => {
  setPositionCustomCamera(
    currentDebugCamera,
    currentDebugCamCoords.x,
    currentDebugCamCoords.y + step,
    currentDebugCamCoords.z
  );
});

alt.on('request:debug_setDebugCamZ', (step: number) => {
  setPositionCustomCamera(
    currentDebugCamera,
    currentDebugCamCoords.x,
    currentDebugCamCoords.y,
    currentDebugCamCoords.z + step
  );
});

alt.on('request:debug_setDebugCamRot', (step: number) => {
  setRotCustomCamera(currentDebugCamera, 0, 0, currentDebugCamRot.z + step);
});
