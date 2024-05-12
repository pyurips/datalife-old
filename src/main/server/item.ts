import * as alt from 'alt-server';
import { sendClientError } from './utils.js';
import { DropData, ItemsType } from './types.js';
import { checkPlayer } from './middlewares.js';
import { player_getCharacterData } from './player.js';
import { consumablesList } from './item_consumables.js';
import { materialsList } from './item_materials.js';
import { clothesList } from './item_clothes.js';

const dropGroup = new alt.VirtualEntityGroup(100);
const DROP_STREAMING_DISTANCE = 100;
const DELETE_DROP_AFTER = 60_000;

export function item_wearCloth(player: alt.Player, id: number) {
  const cloth = clothesList[id];
  if (!cloth) throw new Error();
  if (cloth.kind === 'cloth')
    return cloth.dlc
      ? player.setDlcClothes(
          cloth.dlc,
          cloth.componentId,
          cloth.drawableId,
          cloth.textureId
        )
      : player.setClothes(cloth.componentId, cloth.drawableId, cloth.textureId);
  return cloth.dlc
    ? player.setDlcProp(
        cloth.dlc,
        cloth.componentId,
        cloth.drawableId,
        cloth.textureId
      )
    : player.setProp(cloth.componentId, cloth.drawableId, cloth.textureId);
}

export function item_unwearCloth(player: alt.Player, id: number) {
  // TODO
}

export function item_getItem(id: number, type: ItemsType) {
  switch (type) {
    case 'consumable':
      return consumablesList[id];
    case 'material':
      return materialsList[id];
    case 'cloth':
      return clothesList[id];
    default:
      throw sendClientError(1715503203);
  }
}

export function item_createAObjectDropFromPlayer(
  player: alt.Player,
  dropData: Partial<DropData>
) {
  checkPlayer(player);
  const drop = new alt.VirtualEntity(
    dropGroup,
    new alt.Vector3(
      player.pos.x + Math.random(),
      player.pos.y + Math.random(),
      player.pos.z - 1
    ),
    DROP_STREAMING_DISTANCE
  );
  drop.setStreamSyncedMeta('drop', {
    ...dropData,
    virtualEntityId: drop.id,
    createdAt: Date.now(),
  });
}

export function item_clearDrop() {
  alt.VirtualEntity.all.forEach((drop) => {
    if (!drop.hasStreamSyncedMeta('drop')) return;
    const dropData = drop.getStreamSyncedMeta('drop') as DropData;
    if (Date.now() - dropData.createdAt >= DELETE_DROP_AFTER) {
      drop.destroy();
      alt.emitAllClientsRaw(
        'client_item_clearDropById',
        dropData.virtualEntityId
      );
    }
  });
}

export function item_deleteDropById(dropId: number) {
  const drop = alt.VirtualEntity.all.find(
    (drop) => drop.id === dropId && drop.hasStreamSyncedMeta('drop')
  );
  if (!drop) return;
  drop.destroy();
  alt.emitAllClientsRaw('client_item_clearDropById', dropId);
}

export function item_loadRPCs() {
  alt.onRpc('item_use', (player, data: { index: number }) => {
    checkPlayer(player);
    const itemFromBelongings =
      player_getCharacterData(player).belongings[data.index];
    if (!itemFromBelongings) throw sendClientError(1715391585);
    alt.log(itemFromBelongings);
  });
}
