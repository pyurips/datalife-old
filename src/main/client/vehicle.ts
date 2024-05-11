import * as alt from 'alt-client';
import * as native from 'natives';
import { getClosestVehicleFromPlayer } from './utils.js';

const player = alt.Player.local;

export function vehicle_getType() {
  if (native.isThisModelABicycle(player.vehicle.model)) return 'bicycle';
  if (native.isThisModelABike(player.vehicle.model)) return 'bike';
  if (native.isThisModelABoat(player.vehicle.model)) return 'boat';
  if (native.isThisModelACar(player.vehicle.model)) return 'car';
  if (native.isThisModelAHeli(player.vehicle.model)) return 'heli';
  if (native.isThisModelAPlane(player.vehicle.model)) return 'plane';
  if (native.isThisModelAQuadbike(player.vehicle.model)) return 'quadbike';
  return null;
}

export function vehicle_getSpeed() {
  return player.vehicle.speed;
}

export function vehicle_getGear() {
  return player.vehicle.gear;
}

export function vehicle_getInteractionData() {
  const closestVehicle = getClosestVehicleFromPlayer(5, true);
  if (!closestVehicle) return null;
  if (!closestVehicle.hasStreamSyncedMeta('data')) return null;
  return closestVehicle.getStreamSyncedMeta('data');
}

export async function vehicle_toggleEngine() {
  if (!player.vehicle) return;
  await alt.emitRpc('vehicle_toggleEngine');
}

export async function vehicle_createToPlayer(data: {
  vehicleHash: number;
  playerId?: string;
}) {
  await alt.emitRpc('vehicle_createToPlayer', data);
}

export default {
  vehicle_getType,
  vehicle_getSpeed,
  vehicle_getGear,
  vehicle_getInteractionData,
  vehicle_createToPlayer,
};
