import * as alt from 'alt-server';

async function loadPlayerIntoWorld(player: alt.Player, data?: unknown) {
  player.spawn(-14.295, 24.695, 71.656);
  player.dimension = 0;
  player.giveWeapon(0x83bf0278, 999, false);
}

export default loadPlayerIntoWorld;
