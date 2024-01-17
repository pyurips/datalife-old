import * as alt from 'alt-server';

async function loadPlayerIntoWorld(player: alt.Player, data?: unknown) {
  player.pos = new alt.Vector3(-14.295, 24.695, 71.656);
  player.dimension = 0;
  player.giveWeapon(0x83bf0278, 999, false);
  await alt.Utils.wait(1000);
  new alt.Vehicle(
    0xea6a047f,
    player.pos.x,
    player.pos.y,
    player.pos.z + 1,
    0,
    0,
    0
  );
}

export default loadPlayerIntoWorld;
