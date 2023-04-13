import { create } from 'zustand';
import { AnimeDetails } from '../Types';

interface StoreState {
  anime: AnimeDetails | undefined;
  setAnime: (anime: AnimeDetails | undefined) => void;
}

const useStore = create<StoreState>((set) => ({
  anime: undefined,
  setAnime: (anime) => set((state) => ({ anime: anime })),
}));

export default useStore;
