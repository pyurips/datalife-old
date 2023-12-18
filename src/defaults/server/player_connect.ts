import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
  player.dimension = player.id + 1;
  player.spawn(-774.0126, 342.0428, 196.6864, 0);
  player.model = 0x90769A8F;
  player.giveWeapon(0x2B5EF5EC, 500, false);
});
