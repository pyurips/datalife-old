import * as alt from 'alt-server';

alt.on('playerConnect', (player) => {
  player.dimension = player.id + 1;
  player.spawn(-763.17, 330.59, 199.49, 2);
  player.model = 0x705E61F2;
  player.giveWeapon(0x2b5ef5ec, 500, false);
});
