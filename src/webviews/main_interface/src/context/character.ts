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

export const useCharacterHeadBlend = create<{
  faceMix: number;
  skinMix: number;
  setFaceMix: (value: number) => void;
  setSkinMix: (value: number) => void;
}>((set) => ({
  faceMix: 0,
  skinMix: 0,
  setSkinMix: (value) => set((state) => ({ ...state, skinMix: value })),
  setFaceMix: (value) => set((state) => ({ ...state, faceMix: value })),
}));
