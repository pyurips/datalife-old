import * as alt from 'alt-client';
import * as native from 'natives';
import { getClosestVehicleFromPlayer } from './utils.js';
import { VehicleData } from '../shared/types.js';

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

export async function vehicle_toggleEngine() {
  if (!player.vehicle) return;
  return await alt.emitRpc('vehicle_toggleEngine');
}

export async function vehicle_createToPlayer(data: {
  vehicleHash: number;
  playerId?: string;
}) {
  return await alt.emitRpc('vehicle_createToPlayer', data);
}

export async function vehicle_getData(data: { interactionMode: boolean }) {
  let vehicle: alt.Vehicle;
  if (!data.interactionMode) vehicle = player.vehicle;
  if (data.interactionMode)
    vehicle = getClosestVehicleFromPlayer(5, true) as alt.Vehicle;
  if (!vehicle) return null;
  if (!vehicle.hasStreamSyncedMeta('vehicle')) return null;
  const vehicleData = vehicle.getStreamSyncedMeta('vehicle') as VehicleData;
  return {
    ...vehicleData,
    speed: Math.round(player.vehicle.speed * 3.6),
    gear: player.vehicle.gear,
    type: vehicle_getType(),
  };
}

export default {
  vehicle_getData,
  vehicle_createToPlayer,
};
