import * as alt from 'alt-server';
import { ConsumableStructure } from '../shared/types.js';
import { player_addToHungerNeeds } from './player.js';

enum Consumables {
  bread,
  water,
  medicine,
}

export const consumablesList: { [key in Consumables]: ConsumableStructure } = {
  [Consumables.bread]: {
    weight: 0.1,
    stackable: true,
    value: 5,
    deleteAfterUse: true,
    useCallback: (player) => player_addToHungerNeeds(player, 10),
  },
  [Consumables.water]: {
    weight: 0.1,
    stackable: true,
    value: 5,
    deleteAfterUse: true,
    useCallback: (player) => {},
  },
  [Consumables.medicine]: {
    weight: 0.1,
    stackable: true,
    value: 5,
    deleteAfterUse: true,
    useCallback: (player) => {},
  },
};
