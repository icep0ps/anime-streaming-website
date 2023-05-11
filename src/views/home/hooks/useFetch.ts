import useSWR from 'swr';
import useStore from '../../../common/state/store';
import { useCallback, useEffect, useState } from 'react';
import { Apifetcher, Localfetcher } from '../../../api/fetchers';

const baseUrl = process.env.ANILIST_BASE_URL;
const url = (url: string) => `${baseUrl}/${url}`;

const useFetch = () => {
  const user = useStore((state) => state.user);

  const { data: Spotlight, isLoading: SpotlightIsLoading } = useSWR(
    'http://localhost:2000/trending',
    Localfetcher
  );

  const { data: Popular, isLoading: PopularIsLoading } = useSWR(
    url('popular'),
    Apifetcher
  );

  const { data: Trending, isLoading: TrendingIsLoading } = useSWR(
    url('trending'),
    Apifetcher
  );

  const { data: RecentlyAdded, isLoading: RecentlyAddedIsLoading } = useSWR(
    url('recent-episodes'),
    Apifetcher
  );
  const { data: ContinueWatching, isLoading: ContinueWatchingIsLoading } = useSWR(
    'http://localhost:2000/continueWatching',
    Localfetcher
  );

  const arePagesReady = useCallback(() => {
    return (
      SpotlightIsLoading &&
      PopularIsLoading &&
      PopularIsLoading &&
      TrendingIsLoading &&
      RecentlyAddedIsLoading &&
      ContinueWatchingIsLoading
    );
  }, [
    SpotlightIsLoading,
    PopularIsLoading,
    PopularIsLoading,
    TrendingIsLoading,
    RecentlyAddedIsLoading,
    ContinueWatchingIsLoading,
    user,
  ]);

  return {
    Spotlight,
    Popular,
    Trending,
    RecentlyAdded,
    ContinueWatching,
    arePagesReady,
  };
};

export default useFetch;
