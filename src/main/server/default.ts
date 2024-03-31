import * as alt from 'alt-server';
import Utils from './utils.js';
import Vehicle from './vehicle.js';
import getOperation from './operations.js';

class Default {
  static onPlayerDisconnect() {}

  static onPlayerConnect() {
    alt.on('playerConnect', (player) => {
      player.dimension = player.id + 1;
      player.spawn(0, 0, 0, 0);
      player.model = 0x705e61f2;
    });
  }

  static onEverySecond() {
    new alt.Utils.Interval(() => {
      Vehicle.allVehicles.forEach((vehicle) => vehicle.updateFuel());
    }, 1000);
  }

  static turnOnRpc() {
    alt.onRpc(
      'rpc',
      async (player, type: string, operationName: string, data?: unknown) => {
        const operation = getOperation(player, type, operationName);
        if (typeof operation !== 'function')
          throw Utils.sendClientError(1711876057);
        if (!operation) throw Utils.sendClientError(1711859254);
        return operation.constructor.name === 'AsyncFunction'
          ? await operation(data)
          : operation(data);
      }
    );
  }
}

export default Default;
