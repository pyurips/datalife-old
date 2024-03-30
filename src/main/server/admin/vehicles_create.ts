import * as alt from 'alt-server';
import sendClientError from '../utils/client_error.js';
import createAVehicle from '../utils/create_vehicle.js';

export async function admin_vehicles_createToMe(
  player: alt.Player,
  data?: any
) {
  try {
    const accountData = player.getLocalMeta('accountData') as any;
    if (accountData.permission_level < 2) throw sendClientError(1711835426);
    createAVehicle(data.modelId, player.pos, player.rot, {
      fuelType: 'gasoline',
      fuel: 5000,
      fuelRate: 1,
      numberPlateStyle: 0,
      numberPlateText: 'Pabyu',
      locked: 1,
    });
  } catch (e) {
    if (e.name === 'DATALIFEClientError') throw e;
    throw sendClientError(1711835420);
  }
}
