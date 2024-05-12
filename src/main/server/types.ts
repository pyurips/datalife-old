import * as alt from 'alt-server';

export type AccountData = {
  _id: string;
  discordId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  permissionLevel: 0 | 1 | 2 | 3;
};

export type CharacterData = {
  _id: string;
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
  currentWeight?: number;
};

export type VehicleData = {
  ownerId: string;
  fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  fuelRate: number;
  fuel: number;
  fuelCapacity: number;
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
  allowedPlayers: string[];
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

export type ConsumableStructure = {
  weight: number;
  stackable: boolean;
  value: number;
  useCallback: (player: alt.Player) => void;
};

export type MaterialStructure = {
  weight: number;
  stackable: boolean;
};

export type ClothStructure = {
  weight: number;
  stackable: boolean;
  componentId: number;
  drawableId: number;
  textureId: number;
  upperBody: number;
  dlc?: number;
  kind: 'cloth' | 'prop';
};
