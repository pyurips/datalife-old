import * as alt from 'alt-server';

alt.onClient('request:character_loadPlayerIntoWorld', (player) => {
  player.pos = new alt.Vector3(0, 0, 0);
  player.dimension = 0;
  player.giveWeapon(0x83bf0278, 999, false);
  setTimeout(() => {
    new alt.Vehicle(
      0x546da331,
      player.pos.x,
      player.pos.y,
      player.pos.z,
      0,
      0,
      0
    );
  }, 10000);
});
