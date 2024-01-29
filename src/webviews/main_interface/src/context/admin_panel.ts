import { create } from "zustand";

export const useDebugMode = create<{
  debugMode: boolean;
  setDebugMode: (value: boolean) => void;
}>((set) => ({
  debugMode: false,
  setDebugMode: (value) => set({ debugMode: value }),
}));
