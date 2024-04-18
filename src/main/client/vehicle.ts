import * as alt from 'alt-client';
import * as native from 'natives';

const vehicle = alt.Player.local.vehicle;

export function getType() {
  if (native.isThisModelABicycle(vehicle.model)) return 'bicycle';
  if (native.isThisModelABike(vehicle.model)) return 'bike';
  if (native.isThisModelABoat(vehicle.model)) return 'boat';
  if (native.isThisModelACar(vehicle.model)) return 'car';
  if (native.isThisModelAHeli(vehicle.model)) return 'heli';
  if (native.isThisModelAPlane(vehicle.model)) return 'plane';
  if (native.isThisModelAQuadbike(vehicle.model)) return 'quadbike';
  return null;
}

export function getSpeed() {
  return vehicle.speed;
}

export function getGear() {
  return vehicle.gear;
}

export const callableByRPC = {
  getType,
  getSpeed,
  getGear,
};
