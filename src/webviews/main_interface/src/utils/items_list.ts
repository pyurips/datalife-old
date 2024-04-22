import material_0 from '../assets/items/material_0.svg';

const consumables = [
  {
    name: 'Pão',
    description: 'Um pão fresquinho.',
    imageSource: material_0,
  },
];

export function getItem(
  itemId: number,
  type: 'consumable' | 'cloth' | 'material'
) {
  if (type === 'consumable') {
    return consumables[itemId];
  }
  if (type === 'cloth') {
    return consumables[itemId];
  }
  return consumables[itemId];
}
