import * as alt from 'alt-server';
import operations from './utils/operations.js';
import sendClientError from './utils/client_error';
import fuelHandler from './vehicle/fuel_handler.js';

class Default {
  onVehicleSyncedMetaChange() {
    alt.on('syncedMetaChange', (entity, key, value, oldValue) => {
      if (entity instanceof alt.Vehicle) {
        if (key === 'vehicleData') {
          entity.engineOn = value.fuel === 0 ? false : value.engineState;
          entity.engineHealth = value.engineHealth;
          entity.numberPlateIndex = value.numberPlateStyle;
          entity.numberPlateText = value.numberPlateText;
          entity.lockState = value.locked;
          entity.engineHealth = value.engineHealth;
          entity.dirtLevel = value.dirtLevel;
        }
      }
    });
  }

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
      fuelHandler();
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
