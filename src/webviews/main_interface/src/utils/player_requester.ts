import { useRequester } from './use_requester';

export function player_getCharacterData(): {
  fetch: () => void;
  loading: boolean;
  data:
    | {
        health: number;
        stamina: number;
        money: number;
        bank: number;
        level: number;
        experience: { value: number; rate: number };
        belongings: {
          id: number;
          type: 'consumable' | 'material' | 'cloth';
          quality: 0 | 1 | 2;
          amount: number;
          weight: number;
          usable: boolean;
        }[];
        weightCapacity: number;
        currentWeight: number;
        hotkeysSlots: { id: number; slot: number }[];
        needs: {
          hunger: { value: number; rate: number };
          thirst: { value: number; rate: number };
          fatigue: { value: number; rate: number };
          bathroom: { value: number; rate: number };
          hygiene: { value: number; rate: number };
        };
        conditions: {
          id: number;
          level: number;
          rate: number;
        }[];
        skills: {
          id: Number;
          level: number;
          experience: number;
          rate: number;
        }[];
      }
    | { error: string }
    | undefined;
} {
  return useRequester('server', 'player_getCharacterData', true);
}

export function player_dropBelongingsItem(): {
  fetch: (data: { index: number; amount: number }) => void;
  loading: boolean;
  data: { error: string } | undefined;
} {
  return useRequester('server', 'player_dropBelongingsItem', false);
}

export function player_setAnimationByStaff(): {
  fetch: (data: {
    animDict: string;
    animName: string;
    blendInSpeed?: number;
    blendOutSpeed?: number;
    duration?: number;
    flags?: number;
    playbackRate?: number;
    lockX?: boolean;
    lockY?: boolean;
    lockZ?: boolean;
  }) => void;
  loading: boolean;
  data: { error: string } | undefined;
} {
  return useRequester('server', 'player_setAnimationByStaff', false);
}
