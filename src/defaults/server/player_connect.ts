import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
  player.dimension = player.id + 1;
  player.spawn(-774.0126, 342.0428, 196.6864, 0);
  player.model = 0x8D8F1B10;
  player.giveWeapon(0x2b5ef5ec, 500, false);
});
