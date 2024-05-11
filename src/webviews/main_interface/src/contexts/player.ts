import { create } from 'zustand';
import { Event_player_getCharacterData } from '@/types/player';

export const useCharacterData = create<{
  characterData: Event_player_getCharacterData | null;
  setCharacterData: (value: Event_player_getCharacterData) => void;
}>((set) => ({
  characterData: null,
  setCharacterData: (value) => set({ characterData: value }),
}));
