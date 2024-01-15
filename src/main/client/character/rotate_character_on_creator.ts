import * as alt from 'alt-client';

function startCreatorRotate(step: number) {
  const player = alt.Player.local;
  player.rot = new alt.Vector3(0, 0, player.rot.z + step);
}

export default startCreatorRotate;
