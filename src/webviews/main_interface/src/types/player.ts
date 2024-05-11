export type Event_player_getCharacterData = {
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
};

export type Request_player_setAnimationByStaff = {
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
};

export type Response_player_setAnimationByStaff = { error: string } | null;