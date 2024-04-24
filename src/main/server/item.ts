import * as alt from 'alt-server';
import { sendClientError } from './utils.js';
import { DropData, ItemsType } from './types.js';
import { checkPlayer } from './middlewares.js';

const dropGroup = new alt.VirtualEntityGroup(100);
const DROP_STREAMING_DISTANCE = 100;

export function item_wearCloth(player: alt.Player, id: number) {
  const cloth = clothes[id];
  if (!cloth) throw new Error();
  if (cloth.kind === 'cloth')
    return this.dlc
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
    : player.setProp(this.componentId, this.drawableId, this.textureId);
}

export function item_unwearCloth(player: alt.Player, id: number) {
  // TODO
}

export function item_useConsumable(player: alt.Player, id: number) {
  // TODO
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
      player.pos.z
    ),
    DROP_STREAMING_DISTANCE
  );
  drop.setStreamSyncedMeta('drop', {
    ...dropData,
    virtualEntityId: drop.id,
    createdAt: Date.now(),
  });
}

export function item_getObjectDrop(player: alt.Player, dropId: number) {
  checkPlayer(player);
  const drop = alt.VirtualEntity.all.find(
    (drop) => drop.id === dropId && drop.type === 20
  );
  if (!drop) return null;
  return drop;
}

export function item_clearDrop() {
  alt.VirtualEntity.all.forEach((drop) => {
    if (!(drop.type === 20)) return;
    const dropData = drop.getStreamSyncedMeta('drop') as DropData;
    if (Date.now() - dropData.createdAt >= 60_000) drop.destroy();
  });
}

export const callableByRPC = {
  item_wearCloth,
  item_unwearCloth,
  item_useConsumable,
  item_getObjectDrop,
};
