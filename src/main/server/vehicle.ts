import * as alt from 'alt-server';
import { VehicleData } from './types.js';
import { checkPlayer, getPermissionLevel } from './middlewares.js';

export function vehicle_createToPlayerByStaff(
  player: alt.Player,
  data: { vehicleHash: number }
) {
  checkPlayer(player);
  if (getPermissionLevel(player) < 1) return;
  new alt.Vehicle(
    data.vehicleHash,
    player.pos.x,
    player.pos.y,
    player.pos.z,
    0,
    0,
    0
  );
}

export function vehicle_createByWorld(player: alt.Player) {
  checkPlayer(player);
  new alt.Vehicle(
    'italirsx',
    player.pos.x,
    player.pos.y,
    player.pos.z,
    0,
    0,
    0
  );
}

export function vehicle_setVehicleData(player: alt.Player, data: VehicleData) {
  const vehicle = player.vehicle;
  if (!vehicle?.valid) throw new Error();
  vehicle.setMeta('data', data);
}

export function vehicle_updateData(
  player: alt.Player,
  data: Partial<VehicleData>
) {
  const vehicle = player.vehicle;
  if (!vehicle?.valid) throw new Error();
  const currentData = vehicle.getMeta('data') as VehicleData;
  vehicle.setMeta('data', { ...currentData, ...data });
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
};
