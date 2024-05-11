import * as alt from 'alt-client';
import * as native from 'natives';
import { getClosestVehicleFromPlayer } from './utils.js';

const vehicle = alt.Player.local.vehicle;

export function vehicle_getType() {
  if (native.isThisModelABicycle(vehicle.model)) return 'bicycle';
  if (native.isThisModelABike(vehicle.model)) return 'bike';
  if (native.isThisModelABoat(vehicle.model)) return 'boat';
  if (native.isThisModelACar(vehicle.model)) return 'car';
  if (native.isThisModelAHeli(vehicle.model)) return 'heli';
  if (native.isThisModelAPlane(vehicle.model)) return 'plane';
  if (native.isThisModelAQuadbike(vehicle.model)) return 'quadbike';
  return null;
}

export function vehicle_getSpeed() {
  return vehicle.speed;
}

export function vehicle_getGear() {
  return vehicle.gear;
}

export function vehicle_getInteractionData() {
  const closestVehicle = getClosestVehicleFromPlayer(5, true);
  if (!closestVehicle) return null;
  if (!closestVehicle.hasStreamSyncedMeta('data')) return null;
  return closestVehicle.getStreamSyncedMeta('data');
}

export function vehicle_toggleEngine() {
  if (!vehicle) return;
  alt.emitRpc('vehicle_toggleEngine');
}

export default {
  vehicle_getType,
  vehicle_getSpeed,
  vehicle_getGear,
  vehicle_getInteractionData,
};
