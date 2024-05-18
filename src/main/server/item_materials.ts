import { MaterialStructure } from "../shared/types";

enum Materials {
  wood,
  iron,
  gold,
}

export const materialsList: { [key in Materials]: MaterialStructure } = {
  [Materials.wood]: {
    weight: 1,
    stackable: true,
  },
  [Materials.iron]: {
    weight: 2,
    stackable: true,
  },
  [Materials.gold]: {
    weight: 3,
    stackable: true,
  },
};
