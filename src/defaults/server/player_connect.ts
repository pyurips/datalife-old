import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
  player.dimension = player.id + 1;
  player.spawn(36.19486618041992, 859.3850708007812, 197.71343994140625, 0);
});
