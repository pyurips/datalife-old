import { ConsumableStructure } from "../shared/types";

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
    useCallback: (player) => {},
  },
  [Consumables.water]: {
    weight: 0.1,
    stackable: true,
    value: 5,
    useCallback: (player) => {},
  },
  [Consumables.medicine]: {
    weight: 0.1,
    stackable: true,
    value: 5,
    useCallback: (player) => {},
  },
};
