export type AccountData = {
  _id: string;
  discordId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  permissionLevel: 0 | 1 | 2 | 3;
};

export type CharacterData = {
  name: string;
  health: number;
  stamina: number;
  money: number;
  bank: number;
  level: number;
  experience: { value: number; rate: number };
  belongings: {
    id: number;
    type: ItemsType;
    quality: 0 | 1 | 2;
    amount: number;
  }[];
  weightCapacity: number;
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

export type VehicleData = {
  ownerId: string;
  fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  fuelRate: number;
  fuel: number;
  interactionImageUrl: string;
  trunk: {
    id: number;
    type: ItemsType;
    quality: 0 | 1 | 2;
    amount: number;
  }[];
  trunkWeightCapacity: number;
  trunkWeight: number;
  gloveCompartment: {
    id: number;
    type: ItemsType;
    quality: 0 | 1 | 2;
    amount: number;
  }[];
  gloveCompartmentWeightCapacity: number;
  gloveCompartmentWeight: number;
  gloveCompartmentState: boolean;
  batteryCharge: number;
  batteryCapacity: number;
  batteryState: boolean;
};

export type ItemsType = 'consumable' | 'material' | 'cloth';

export type DropData = {
  virtualEntityId: number;
  itemId: number;
  type: ItemsType;
  quality: 0 | 1 | 2;
  amount: number;
  createdAt: number;
};

export type MainWebViewEvents = 'server_getCharacterData';
