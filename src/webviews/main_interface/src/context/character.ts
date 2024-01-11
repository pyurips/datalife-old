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
      fatherFace: 0,
      motherFace: 0,
      fatherSkin: 0,
      motherSkin: 0,
      faceMix: 0,
      skinMix: 0,
    })
    .map((_) => ({
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
          fatherFace: 0,
          motherFace: 0,
          fatherSkin: 0,
          motherSkin: 0,
          faceMix: 0,
          skinMix: 0,
        })
        .map((_) => ({
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
