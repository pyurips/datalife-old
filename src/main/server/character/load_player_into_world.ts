import * as alt from 'alt-server';

alt.onClient('request:character_loadPlayerIntoWorld', (player) => {
  player.pos = new alt.Vector3(0, 0, 0);
  player.dimension = 0;
});
