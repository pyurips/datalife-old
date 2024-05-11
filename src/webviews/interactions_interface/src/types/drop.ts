export type Request_item_getInteractionDropData = null;
export type Response_item_getInteractionDropData = {
  itemId: number;
  type: 'consumable' | 'cloth' | 'material';
  amount: number;
  quality: 0 | 1 | 2;
  virtualEntityId: number;
} | null;
