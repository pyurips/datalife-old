import * as alt from 'alt-server';
import { VehicleData } from './types.js';
import { checkPlayer } from './middlewares.js';

export function vehicle_createByStaff(player: alt.Player) {}

export function vehicle_createByWorld(player: alt.Player) {
  new alt.Vehicle(
    'blista',
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
  if (player.vehicle.engineOn) return (player.vehicle.engineOn = false);
  return (player.vehicle.engineOn = true);
}

export const callableByRPC = {
  vehicle_toggleEngine,
};
