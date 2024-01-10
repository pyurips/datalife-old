import * as alt from 'alt-client';

const player = alt.Player.local;

alt.on('request:character_startCreatorRotate', (step: number) => {
  player.rot = new alt.Vector3(0, 0, player.rot.z + step);
});
