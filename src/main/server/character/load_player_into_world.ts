import * as alt from 'alt-server';
import createAVehicle from '../utils/create_vehicle.js';

async function loadPlayerIntoWorld(player: alt.Player, data?: unknown) {
  player.spawn(-14.295, 24.695, 71.656);
  player.dimension = 0;
  player.giveWeapon(0x83bf0278, 999, false);
  await alt.Utils.wait(1000);
  createAVehicle(0x13b57d8a, player.pos, player.rot, {
    numberPlateText: 'Pablo',
    numberPlateStyle: 0,
    fuelType: 'gasoline',
    fuelCapacity: 100,
    fuelRate: 1,
  });
}

export default loadPlayerIntoWorld;
