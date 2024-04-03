import { create } from 'zustand';
import useRequester from '@/utils/use_requester.js';

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
  setPage: (value) => {
    const { fetch } = useRequester('setPageMode', false);
    if (value === 'mainHud') fetch(false);
    fetch(true);
    return set({ page: value });
  },
}));
