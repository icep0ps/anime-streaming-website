import axios from 'axios';
import { Fetcher } from 'swr';
import { TopAiringAnime, PopularAnime, TrendingAnime } from '../common/Types';

export const topAiring: Fetcher<TopAiringAnime[]> = (url: string) =>
  axios.get(url).then((res) => res.data.results);

export const topAnime: Fetcher<PopularAnime[]> = (url: string) =>
  axios.get(url).then((res) => res.data.results);

export const trendingAnime: Fetcher<TrendingAnime[]> = (url: string) =>
  axios
    .get(url, {
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 3000,
      },
    })
    .then((res) => {
      console.log(res.data.data);
      return res.data.data;
    });
