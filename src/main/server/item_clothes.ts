import { ClothStructure } from './types.js';

enum Clothes {
  tshirt,
  tshirt2,
  pants,
  mask,
}

export const clothesList: { [key in Clothes]: ClothStructure } = {
  [Clothes.tshirt]: {
    weight: 1,
    stackable: false,
    componentId: 11,
    drawableId: 15,
    textureId: 0,
    upperBody: 0,
    kind: 'cloth',
  },
  [Clothes.tshirt2]: {
    weight: 1,
    stackable: false,
    componentId: 11,
    drawableId: 16,
    textureId: 0,
    upperBody: 0,
    kind: 'cloth',
  },
  [Clothes.pants]: {
    weight: 1,
    stackable: false,
    componentId: 4,
    drawableId: 21,
    textureId: 0,
    upperBody: 0,
    kind: 'cloth',
  },
  [Clothes.mask]: {
    weight: 1,
    stackable: false,
    componentId: 1,
    drawableId: 121,
    textureId: 0,
    upperBody: 0,
    kind: 'prop',
  },
};
