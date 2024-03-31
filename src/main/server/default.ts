import * as alt from 'alt-server';
import operations from './utils/operations.js';
import sendClientError from './utils/client_error';
import fuelHandler from './vehicle/fuel_handler.js';
import Vehicle from './vehicle.js';

class Default {
  onPlayerDisconnect() {}

  onPlayerConnect() {
    alt.on('playerConnect', (player) => {
      player.dimension = player.id + 1;
      player.spawn(0, 0, 0, 0);
      player.model = 0x705e61f2;
    });
  }

  onEverySecond() {
    new alt.Utils.Interval(() => {
      Vehicle.allVehicles.forEach((vehicle) => vehicle.updateFuel());
    }, 1000);
  }

  turnOnRpc() {
    alt.onRpc('rpc', async (player, operationName: string, data?: unknown) => {
      const operation = operations[operationName];
      if (!operation) throw sendClientError(1711859254);
      return operation.constructor.name === 'AsyncFunction'
        ? await operation(player, data)
        : operation(player, data);
    });
  }
}

export default Default;
