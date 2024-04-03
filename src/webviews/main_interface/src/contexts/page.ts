import { create } from 'zustand';

export const usePage = create<{
  page:
    | 'signin'
    | 'mainHud'
    | 'characterMenu'
    | 'characterCustomization'
    | 'adminPanel';
  setPage: (
    value:
      | 'signin'
      | 'mainHud'
      | 'characterMenu'
      | 'characterCustomization'
      | 'adminPanel'
  ) => void;
}>((set) => ({
  page: 'signin',
  setPage: (value) => set({ page: value }),
}));
