export type AccountData = {
  id: string;
  discordId: string;
  createdAt: Date;
  updatedAt: Date;
  lastLogin: Date;
  permissionLevel: 0 | 1 | 2 | 3;
  bits: number;
};

export type CharacterData = {
  health: number;
  money: number;
  bank: number;
  level: number;
  experience: number;
  belongings: {
    id: number;
    type: string;
    quality: number;
    amount: number;
  }[];
  weightCapacity: number;
  hotkeysSlots: any[];
  needs: {
    hunger: { value: number; rate: number };
    thirst: { value: number; rate: number };
    fatigue: { value: number; rate: number };
    bathroom: { value: number; rate: number };
    hygiene: { value: number; rate: number };
  };
  conditions: {
    type: string;
    level: number;
    rate: number;
  }[];
  skills: {
    type: string;
    level: number;
    experience: number;
    rate: number;
  }[];
};

export type VehicleData = {
  fuelType: 'gasoline' | 'diesel' | 'eletric' | 'kerosene' | null;
  fuelRate: number;
  fuel: number;
};