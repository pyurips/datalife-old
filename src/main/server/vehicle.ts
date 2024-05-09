import * as alt from 'alt-server';
import { VehicleData } from './types.js';
import { checkPlayer, getPermissionLevel } from './middlewares.js';
import { player_getCharacterData } from './player.js';

export function vehicle_createToMeByStaff(
  player: alt.Player,
  data: { vehicleHash: number }
) {
  if (getPermissionLevel(player) < 1) return;
  const vehicle = new alt.Vehicle(
    data.vehicleHash,
    player.pos.x + Math.cos(player.rot.z) * 2,
    player.pos.y + Math.sin(player.rot.z) * 2,
    player.pos.z,
    player.rot.x,
    player.rot.y,
    player.rot.z
  );
  vehicle_setVehicleData(vehicle, {
    ownerId: null,
    fuelType: 'gasoline',
    fuelRate: 0.1,
    fuel: 100,
    interactionImageUrl:
      'https://i.pinimg.com/originals/7c/d4/15/7cd415c2a1d5649e16a8eef19cf13664.gif',
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
  });
}

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
    interactionImageUrl:
      'https://i.pinimg.com/originals/7c/d4/15/7cd415c2a1d5649e16a8eef19cf13664.gif',
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
  });
}

export function vehicle_setVehicleData(
  vehicle: alt.Vehicle,
  data: VehicleData
) {
  if (!vehicle?.valid) throw new Error();
  vehicle.setStreamSyncedMeta('data', data);
}

export function vehicle_updateData(
  vehicle: alt.Vehicle,
  data: Partial<VehicleData>
) {
  if (!vehicle?.valid) throw new Error();
  const currentData = vehicle.getMeta('data') as VehicleData;
  vehicle.setStreamSyncedMeta('data', { ...currentData, ...data });
}

export function vehicle_toggleEngine(player: alt.Player) {
  checkPlayer(player);
  if (!player.vehicle) return;
  if (player.vehicle.engineOn) {
    player.vehicle.engineOn = false;
    return;
  }
  player.vehicle.engineOn = true;
  return;
}

export const callableByRPC = {
  vehicle_toggleEngine,
  vehicle_createToMeByStaff,
};
