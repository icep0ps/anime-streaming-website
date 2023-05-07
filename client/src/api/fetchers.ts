import axios from 'axios';
import { Fetcher } from 'swr';
import {
  TrendingAnime,
  StreamingLinkDetails,
  SeachResults,
  IAnime,
} from '../common/Types';

export const Apifetcher = (url: string) => axios.get(url).then((res) => res.data.results);

export const Localfetcher = (url: string) =>
  axios.get(url, { withCredentials: true }).then((res) => res.data.data);

export const getAnimeDetails: Fetcher<IAnime> = (url: string) =>
  axios.get(url).then((res) => res.data);

export const topAnime: Fetcher<IAnime[]> = (url: string) =>
  axios.get(url).then((res) => res.data.results);

export const trendingAnime: Fetcher<IAnime[]> = (url: string) =>
  axios
    .get(url, {
      proxy: {
        protocol: 'https',
        host: '127.0.0.1',
        port: 3000,
      },
    })
    .then((res) => res.data.data);

export const getStreamingLink: Fetcher<StreamingLinkDetails> = (url: string) =>
  axios.get(url).then((res) => res.data);

export const search = (args: [url: string, query: string]) => {
  const [url, query] = args;
  return axios
    .get(url, {
      params: {
        query,
      },
    })
    .then((res) => res.data.results);
};

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
      return res.data.continueWatching;
    });
};
type test = IAnime & { continueFrom: string; lastUpdated: string };

export const addToWatching = (url: string, arg: { arg: test }) => {
  return axios.post(url, { ...arg }, { method: 'POST', withCredentials: true });
};
