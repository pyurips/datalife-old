const consumables = [
  {
    name: 'Pão',
    description: 'Um pão fresquinho.',
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
