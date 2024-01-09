import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
  player.dimension = player.id + 1;
  player.spawn(0, 0, 0, 0);
  player.model = 0x705e61f2;
});
