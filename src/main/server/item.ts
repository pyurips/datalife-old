import * as alt from 'alt-server';
import { sendClientError } from './utils.js';
import { DropData, ItemsType } from './types.js';
import { checkPlayer } from './middlewares.js';
import { player_addToHunger, player_getCharacterData } from './player.js';

const dropGroup = new alt.VirtualEntityGroup(100);
const DROP_STREAMING_DISTANCE = 100;
const DELETE_DROP_AFTER = 60_000;

export function item_wearCloth(player: alt.Player, id: number) {
  const cloth = clothes[id];
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

export function item_consume(player: alt.Player, index: number) {
  const itemFromBelongings = player_getCharacterData(player).belongings[index];
  if (!itemFromBelongings) return;
  if (itemFromBelongings.type !== 'consumable') return;
  const item = item_getItem(
    itemFromBelongings.id,
    'consumable'
  ) as (typeof consumables)[0];
  if (!item) return;

  if (itemFromBelongings.id === 0)
    return player_addToHunger(player, item.value);
}

export const consumables: {
  weight: number;
  stackable: boolean;
  value: number;
  kind: 'food' | 'drink' | 'medicine';
}[] = [
  {
    weight: 0.1,
    stackable: true,
    value: 5,
    kind: 'food',
  },
];

export const materials: {
  weight: number;
  stackable: boolean;
}[] = [
  {
    weight: 0.5,
    stackable: true,
  },
];

export const clothes: {
  weight: number;
  stackable: boolean;
  componentId: number;
  drawableId: number;
  textureId: number;
  upperBody: number;
  dlc?: number;
  kind: 'cloth' | 'prop';
}[] = [
  {
    weight: 0.5,
    stackable: false,
    componentId: 11,
    drawableId: 15,
    textureId: 0,
    upperBody: 0,
    kind: 'cloth',
  },
  {
    weight: 1,
    stackable: false,
    componentId: 11,
    drawableId: 15,
    textureId: 1,
    upperBody: 0,
    kind: 'cloth',
  },
  {
    weight: 1.5,
    stackable: false,
    componentId: 9,
    drawableId: 9,
    textureId: 0,
    upperBody: 1,
    kind: 'cloth',
  },
  {
    weight: 0.2,
    stackable: false,
    componentId: 6,
    drawableId: 4,
    textureId: 0,
    upperBody: 0,
    kind: 'prop',
  },
];

export function item_getItem(id: number, type: ItemsType) {
  if (type === 'consumable') return consumables[id];
  if (type === 'material') return materials[id];
  if (type === 'cloth') return clothes[id];
  throw sendClientError(1713785225);
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

export const callableByRPC = {
  item_wearCloth,
  item_unwearCloth,
  item_consume,
};
