import * as alt from 'alt-client';
import {
  getClosestVehicleFromPlayer,
  getClosestMarkerFromPlayer,
  getClosestObjectFromPlayer,
  getDistanceBetween,
} from './utils.js';
import { setObjectViewPos } from './webview.js';

let currentInteraction: 'vehicle' | 'object' | 'marker' = null;
const player = alt.Player.local;

export function checkInteraction() {
  const closestVehicle = getClosestVehicleFromPlayer(player, 5);
  const closestObject = getClosestObjectFromPlayer(player, 5);
  const closestMarker = getClosestMarkerFromPlayer(player, 5);

  let closestVehicleDistance: number = null;
  let closestObjectDistance: number = null;
  let closestMarkerDistance: number = null;

  const closestDistances = [];

  if (closestVehicle) {
    closestVehicleDistance = getDistanceBetween(player.pos, closestVehicle.pos);
    closestDistances.push(closestVehicleDistance);
  }
  if (closestObject) {
    closestObjectDistance = getDistanceBetween(player.pos, closestObject.pos);
    closestDistances.push(closestObjectDistance);
  }
  if (closestMarker) {
    closestMarkerDistance = getDistanceBetween(player.pos, closestMarker.pos);
    closestDistances.push(closestMarkerDistance);
  }

  if (!closestDistances.length) return setObjectViewPos(1, new alt.Vector3(0, 0, 0));
  let minDistance = Math.min(...closestDistances);

  if (minDistance === closestVehicleDistance) {
    setObjectViewPos(
      1,
      new alt.Vector3(
        closestVehicle.pos.x,
        closestVehicle.pos.y,
        closestVehicle.pos.z + 1.5
      )
    );
    return (currentInteraction = 'vehicle');
  }

  if (minDistance === closestObjectDistance) {
    setObjectViewPos(1, closestObject.pos);
    return (currentInteraction = 'object');
  }
  setObjectViewPos(1, closestMarker.pos);
  return (currentInteraction = 'marker');
}

export function setCanInteract(canInteract: boolean) {
  alt.setMeta('canInteract', canInteract);
}

export function getCanInteract() {
  return alt.getMeta('canInteract');
}
