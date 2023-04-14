import axios from 'axios';
import { Fetcher } from 'swr';
import {
  TopAiringAnime,
  PopularAnime,
  TrendingAnime,
  AnimeDetails,
  StreamingLinkDetails,
  SeachResults,
} from '../common/Types';

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
    .then((res) => res.data.data);

export const getAnimeDetails: Fetcher<AnimeDetails> = (url: string) =>
  axios.get(url).then((res) => res.data);

export const getStreamingLink: Fetcher<StreamingLinkDetails> = (url: string) =>
  axios.get(url).then((res) => res.data);

export const search: Fetcher<SeachResults> = (url: string) =>
  axios.get(url).then((res) => res.data);
