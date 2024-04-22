import { create } from 'zustand';
import { CharacterData } from '@/types';

export const useCharacterData = create<{
  characterData: CharacterData | null;
  setCharacterData: (value: CharacterData) => void;
}>((set) => ({
  characterData: null,
  setCharacterData: (value) => set({ characterData: value }),
}));
