import { create } from 'zustand';
import { IAnime, Episode, User, Recommendations } from '../Types';

interface StoreState {
  user: User | undefined;
  anime: IAnime | undefined | Recommendations;
  episode: Episode | undefined;
  setAnime: (anime: IAnime | undefined) => void;
  setUser: (user: User) => void;
  setEpisode: (episode: Episode) => void;
}

const useStore = create<StoreState>((set) => ({
  anime: undefined,
  user: undefined,
  episode: undefined,

  setUser: (user: User) => set((state) => ({ user: user })),
  setAnime: (anime) => set((state) => ({ anime: anime })),
  setEpisode: (episode: Episode) => set((state) => ({ episode: episode })),
}));

export default useStore;
