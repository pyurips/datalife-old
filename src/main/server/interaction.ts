import * as alt from 'alt-server';
import {
  getClosestDropFromPlayer,
  getClosestVehicleFromPlayer,
  getDistanceBetween,
} from './utils.js';
import { DropData } from './types.js';
import { player_addItemToBelongings } from './player.js';
import { item_deleteDropById } from './item.js';

export function interaction_check(player: alt.Player) {
  const closestVehicle = getClosestVehicleFromPlayer(player, 5, true);
  const closestObject = getClosestDropFromPlayer(player, 3);
  const closestEntity = [closestVehicle, closestObject].reduce((prev, curr) => {
    if (!prev) return curr;
    if (!curr) return prev;

    const prevDist = getDistanceBetween(player.pos, prev.pos);
    const currDist = getDistanceBetween(player.pos, curr.pos);

    return prevDist < currDist ? prev : curr;
  }, null);

  if (!closestEntity) return;
  if (closestEntity.hasStreamSyncedMeta('drop')) {
    const dropData = closestEntity.getStreamSyncedMeta('drop') as DropData;
    player_addItemToBelongings(
      player,
      dropData.itemId,
      dropData.type,
      dropData.amount,
      dropData.quality
    );
    return item_deleteDropById(dropData.virtualEntityId);
  }
}

export const callableByRPC = {
  interaction_check,
};
