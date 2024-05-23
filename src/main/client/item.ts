import * as alt from 'alt-client';
import { getClosestDropFromPlayer } from './utils.js';

export function item_initializeClearDropById() {
  alt.onServer('client_item_clearDropById', (id: number) => {
    alt.LocalObject.all.forEach(async (object) => {
      if (!object?.valid) return;
      if (!object.hasMeta('drop')) return;
      const drop = object.getMeta('drop') as any;
      if (drop.virtualEntityId === id) return object.destroy();
    });
  });
}

export function item_getInteractionDropData() {
  const closestDrop = getClosestDropFromPlayer(3);
  if (!closestDrop) return null;
  if (!closestDrop.hasMeta('drop')) return null;
  return closestDrop.getMeta('drop');
}

export async function item_use(data: unknown) {
  return await alt.emitRpc('item_use', data);
}

export default {
  item_use,
  item_getInteractionDropData,
};
