import { create } from 'zustand';
import creatorAdjectives from '../utils/creator_adjectives';

export const useCharacterName = create<{
  characterName: string;
  setCharacterName: (value: string) => void;
}>((set) => ({
  characterName: '',
  setCharacterName: (value) => set({ characterName: value }),
}));

export const useCharacterNameValidation = create<{
  validationErrors: string;
  setValidationErrors: (value: string) => void;
}>((set) => ({
  validationErrors: '',
  setValidationErrors: (value) => set({ validationErrors: value }),
}));

export const useCharacterModel = create<{
  model: number;
  setCharacterModel: (value: number) => void;
}>((set) => ({
  model: 0x705e61f2,
  setCharacterModel: (value) => set({ model: value }),
}));

export const useCharacterHeadBlend = create<{
  fatherFace: number;
  motherFace: number;
  fatherSkin: number;
  motherSkin: number;
  faceMix: number;
  skinMix: number;
  setFaceMix: (value: number) => void;
  setSkinMix: (value: number) => void;
  setFatherFace: (value: number) => void;
  setMotherFace: (value: number) => void;
  setFatherSkin: (value: number) => void;
  setMotherSkin: (value: number) => void;
}>((set) => ({
  fatherFace: 0,
  motherFace: 21,
  fatherSkin: 0,
  motherSkin: 0,
  faceMix: 0,
  skinMix: 0,
  setSkinMix: (value) => set((state) => ({ ...state, skinMix: value })),
  setFaceMix: (value) => set((state) => ({ ...state, faceMix: value })),
  setFatherFace: (value) => set((state) => ({ ...state, fatherFace: value })),
  setMotherFace: (value) => set((state) => ({ ...state, motherFace: value })),
  setFatherSkin: (value) => set((state) => ({ ...state, fatherSkin: value })),
  setMotherSkin: (value) => set((state) => ({ ...state, motherSkin: value })),
}));

export const useRandomFaces = create<{
  randomFaces: {
    adjective: string,
    iconId: number
    fatherFace: number;
    motherFace: number;
    fatherSkin: number;
    motherSkin: number;
    faceMix: number;
    skinMix: number;
  }[];
  resetRandomFaces: () => void;
}>((set) => ({
  randomFaces: new Array(20)
    .fill({
      adjective: '',
      iconId: 0,
      fatherFace: 0,
      motherFace: 0,
      fatherSkin: 0,
      motherSkin: 0,
      faceMix: 0,
      skinMix: 0,
    })
    .map((_) => ({
      adjective: creatorAdjectives[Math.floor(Math.random() * creatorAdjectives.length)],
      iconId: Math.floor(Math.random() * 6) + 1,
      fatherFace: Math.floor(
        Math.random() * Array.from({ length: 46 }, (_, index) => index).length
      ),
      motherFace: Math.floor(
        Math.random() * Array.from({ length: 46 }, (_, index) => index).length
      ),
      fatherSkin: Math.floor(
        Math.random() * Array.from({ length: 46 }, (_, index) => index).length
      ),
      motherSkin: Math.floor(
        Math.random() * Array.from({ length: 46 }, (_, index) => index).length
      ),
      faceMix: Math.random(),
      skinMix: Math.random(),
    })),

  resetRandomFaces: () =>
    set({
      randomFaces: new Array(20)
        .fill({
          adjective: '',
          iconId: 0,
          fatherFace: 0,
          motherFace: 0,
          fatherSkin: 0,
          motherSkin: 0,
          faceMix: 0,
          skinMix: 0,
        })
        .map((_) => ({
          adjective: creatorAdjectives[Math.floor(Math.random() * creatorAdjectives.length)],
          iconId: Math.floor(Math.random() * 6) + 1,
          fatherFace: Math.floor(
            Math.random() *
              Array.from({ length: 46 }, (_, index) => index).length
          ),
          motherFace: Math.floor(
            Math.random() *
              Array.from({ length: 46 }, (_, index) => index).length
          ),
          fatherSkin: Math.floor(
            Math.random() *
              Array.from({ length: 46 }, (_, index) => index).length
          ),
          motherSkin: Math.floor(
            Math.random() *
              Array.from({ length: 46 }, (_, index) => index).length
          ),
          faceMix: Math.random(),
          skinMix: Math.random(),
        })),
    }),
}));

export const useSelectedRandomFace = create<{
  selectedRandomFace: number | null;
  setSelectedRandomFace: (value: number | null) => void;
}>((set) => ({
  selectedRandomFace: null,
  setSelectedRandomFace: (value) => set({ selectedRandomFace: value }),
}));