import * as alt from 'alt-server';
import { VehicleData } from '../shared/types.js';
import { checkPlayer } from './middlewares.js';
import { player_getCharacterData } from './player.js';
import { sendClientError } from './utils.js';

export function vehicle_createByWorld(player: alt.Player) {
  checkPlayer(player);
  const characterData = player_getCharacterData(player);
  const vehicle = new alt.Vehicle(
    'italirsx',
    player.pos.x,
    player.pos.y,
    player.pos.z,
    0,
    0,
    0
  );
  vehicle_setVehicleData(vehicle, {
    ownerId: characterData._id,
    fuelType: 'gasoline',
    fuelRate: 0.1,
    fuel: 100,
    fuelCapacity: 100,
    interactionImageUrl:
      'https://media1.tenor.com/m/ZAMoMuQgf9UAAAAd/mapache-pedro.gif',
    trunk: [],
    trunkWeightCapacity: 100,
    trunkWeight: 0,
    gloveCompartment: [],
    gloveCompartmentWeightCapacity: 10,
    gloveCompartmentWeight: 0,
    gloveCompartmentState: false,
    batteryCharge: 100,
    batteryCapacity: 100,
    batteryState: true,
    allowedPlayers: [],
  });
}

export function vehicle_setVehicleData(
  vehicle: alt.Vehicle,
  data: VehicleData
) {
  if (!vehicle?.valid) throw new Error();
  vehicle.setStreamSyncedMeta('vehicle', data);
}

export function vehicle_updateData(
  vehicle: alt.Vehicle,
  data: Partial<VehicleData>
) {
  if (!vehicle?.valid) throw new Error();
  const currentData = vehicle.getStreamSyncedMeta('vehicle') as VehicleData;
  vehicle.setStreamSyncedMeta('vehicle', { ...currentData, ...data });
}

export function vehicle_loadRPCs() {
  alt.onRpc('vehicle_toggleEngine', (player) => {
    checkPlayer(player);
    if (!player.vehicle) return;
    if (player.vehicle.engineOn) {
      player.vehicle.engineOn = false;
      return;
    }
    player.vehicle.engineOn = true;
    return;
  });

  alt.onRpc(
    'vehicle_createToPlayer',
    (player, data: { vehicleHash: number; playerId?: string }) => {
      checkPlayer(player, 2);
      const characterData = player_getCharacterData(player);
      let targetPlayer = player;
      if (data?.playerId)
        targetPlayer = alt.Player.all.find(
          (p) => player_getCharacterData(p)._id === data.playerId
        );
      if (!targetPlayer)
        throw sendClientError(0, false, "Player doesn't exist");
      const vehicle = new alt.Vehicle(
        data.vehicleHash,
        targetPlayer.pos.x + Math.cos(player.rot.z) * 2,
        targetPlayer.pos.y + Math.sin(player.rot.z) * 2,
        targetPlayer.pos.z,
        targetPlayer.rot.x,
        targetPlayer.rot.y,
        targetPlayer.rot.z
      );
      vehicle_setVehicleData(vehicle, {
        ownerId: null,
        fuelType: 'gasoline',
        fuelRate: 0.1,
        fuel: 100,
        fuelCapacity: 100,
        interactionImageUrl:
          'https://media1.tenor.com/m/ZAMoMuQgf9UAAAAd/mapache-pedro.gif',
        trunk: [],
        trunkWeightCapacity: 100,
        trunkWeight: 0,
        gloveCompartment: [],
        gloveCompartmentWeightCapacity: 10,
        gloveCompartmentWeight: 0,
        gloveCompartmentState: false,
        batteryCharge: 100,
        batteryCapacity: 100,
        batteryState: true,
        allowedPlayers: [characterData._id],
      });
    }
  );
}
