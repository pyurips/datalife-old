import { create } from 'zustand';

export const usePage = create<{
  page:
    | 'signin'
    | 'mainHud'
    | 'characterMenu'
    | 'characterCustomization'
    | 'adminPanel';
  canChangePage: boolean;
  setPage: (
    value:
      | 'signin'
      | 'mainHud'
      | 'characterMenu'
      | 'characterCustomization'
      | 'adminPanel'
  ) => void;
  setCanChangePage: (value: boolean) => void;
}>((set) => ({
  page: 'signin',
  canChangePage: false,
  setCanChangePage: (value) => set({ canChangePage: value }),
  setPage: (value) => set({ page: value }),
}));
