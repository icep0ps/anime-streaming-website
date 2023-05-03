import useSWR from 'swr';
import { useEffect, useState } from 'react';
import { Apifetcher, Localfetcher } from '../../../api/fetchers';

const baseUrl = process.env.ANILIST_BASE_URL;
const url = (url: string) => `${baseUrl}/${url}`;

const useFetch = () => {
  const FETCH_COUNT = 4;
  const options = {
    revalidateOnFocus: false,
  };

  const [pagesReady, setPagesReady] = useState<Map<string, boolean>>(new Map());

  const { data: Spotlight, isLoading: SpotlightIsLoading } = useSWR(
    'http://localhost:2000/trending',
    Localfetcher,
    {
      onSuccess: () =>
        setPagesReady((pages) => pages.set('spolight', SpotlightIsLoading)),
      ...options,
    }
  );

  const { data: Popular, isLoading: PopularIsLoading } = useSWR(
    url('popular'),
    Apifetcher,
    {
      onSuccess: () => setPagesReady((pages) => pages.set('popular', PopularIsLoading)),
      ...options,
    }
  );

  const { data: Trending, isLoading: TrendingIsLoading } = useSWR(
    url('trending'),
    Apifetcher,
    {
      onSuccess: () => setPagesReady((pages) => pages.set('trending', TrendingIsLoading)),
      ...options,
    }
  );

  const { data: RecentlyAdded, isLoading: RecentlyAddedIsLoading } = useSWR(
    url('recent-episodes'),
    Apifetcher,
    {
      onSuccess: () =>
        setPagesReady((pages) => pages.set('recent-episodes', RecentlyAddedIsLoading)),
      ...options,
    }
  );
  const { data: ContinueWatching, isLoading: ContinueWatchingIsLoading } = useSWR(
    'http://localhost:2000/continueWatching',
    Localfetcher,
    {
      onSuccess: () =>
        setPagesReady((pages) =>
          pages.set('continueWatching', ContinueWatchingIsLoading)
        ),
      ...options,
    }
  );

  return {
    Spotlight,
    Popular,
    Trending,
    RecentlyAdded,
    ContinueWatching,
    pagesReady,
    FETCH_COUNT,
  };
};

export default useFetch;
