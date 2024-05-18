import * as alt from 'alt-server';
import {
  getClosestDropFromPlayer,
  getClosestVehicleFromPlayer,
  getDistanceBetween,
} from './utils.js';
import { DropData } from '../shared/types.js';
import { player_addItemToBelongings } from './player.js';
import { item_deleteDropById } from './item.js';

export function interaction_loadRPCs() {
  alt.onRpc('interaction_getDrop', (player) => {
    const closestDrop = getClosestDropFromPlayer(player, 3);

    if (!closestDrop) return;
    if (closestDrop.hasStreamSyncedMeta('drop')) {
      const dropData = closestDrop.getStreamSyncedMeta('drop') as DropData;
      player_addItemToBelongings(
        player,
        dropData.itemId,
        dropData.type,
        dropData.amount,
        dropData.quality
      );
      return item_deleteDropById(dropData.virtualEntityId);
    }
  });
}
