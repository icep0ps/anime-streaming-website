import { create } from 'zustand';
import { AnimeDetails, User } from '../Types';

interface StoreState {
  user: User | undefined;
  anime: AnimeDetails | undefined;
  setAnime: (anime: AnimeDetails | undefined) => void;
  setUser: (user: User) => void;
}

const useStore = create<StoreState>((set) => ({
  anime: undefined,
  user: undefined,

  setUser: (user: User) => set((state) => ({ user: user })),
  setAnime: (anime) => set((state) => ({ anime: anime })),
}));

export default useStore;
