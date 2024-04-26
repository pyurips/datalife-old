import * as alt from 'alt-server';
import {
  getClosestDropFromPlayer,
  getClosestVehicleFromPlayer,
  getDistanceBetween,
} from './utils.js';

export function interation_check(player: alt.Player) {
  const closestVehicle = getClosestVehicleFromPlayer(player, 5, true);
  const closestObject = getClosestDropFromPlayer(player, 3);
  const closestEntity = [closestVehicle, closestObject].reduce((prev, curr) => {
    if (!prev) return curr;
    if (!curr) return prev;

    const prevDist = getDistanceBetween(player.pos, prev.pos);
    const currDist = getDistanceBetween(player.pos, curr.pos);

    return prevDist < currDist ? prev : curr;
  }, null);

  return closestEntity;
}
