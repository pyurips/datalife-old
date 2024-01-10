import { create } from 'zustand';

export const useCharacterName = create<{
  characterName: string;
  setCharacterName: (value: string) => void;
}>((set) => ({
  characterName: '',
  setCharacterName: (value) => set({ characterName: value }),
}));

export const useCharacterModel = create<{
  model: number;
  setCharacterModel: (value: number) => void;
}>((set) => ({
  model: 0x705e61f2,
  setCharacterModel: (value) => set({ model: value }),
}));

export const useCharacterFacialFeatures = create<{
  facialFeatures: number;
  setFacialFeatures: (value: number) => void;
}>((set) => ({
  facialFeatures: 0.5,
  setFacialFeatures: (value) => set({ facialFeatures: value }),
}));