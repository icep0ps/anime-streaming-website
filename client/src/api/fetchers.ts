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

export const isUserLoggedIn = () => {
  return axios
    .get('http://localhost:2000/isLoggedIn', {
      withCredentials: true,
    })
    .then((res) => res.data.user)
    .catch((err) => null);
};

export const getWatching = (args: [url: string, userId: string]) => {
  const [url, userId] = args;
  return axios
    .get(url, {
      params: {
        userId,
      },
    })
    .then((res) => {
      console.log(res.data);
      return res.data.continueWatching;
    });
};
type test = AnimeDetails & { continueFrom: string; lastUpdated: string };

export const addToWatching = (url: string, arg: { arg: test }) => {
  return axios.post(url, { ...arg }, { method: 'POST', withCredentials: true });
};
