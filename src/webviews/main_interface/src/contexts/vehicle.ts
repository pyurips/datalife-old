import { create } from 'zustand';

export const useVehicleHUD = create<{
  state: boolean;
  setState: (value: boolean) => void;
}>((set) => ({
  state: false,
  setState: (value) => set({ state: value }),
}));
