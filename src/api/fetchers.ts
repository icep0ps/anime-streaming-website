import axios from 'axios';
import { Fetcher } from 'swr';
import { TopAiringAnime, PopularAnime } from '../common/Types';

export const topAiring: Fetcher<TopAiringAnime[]> = (url: string) =>
  axios.get(url).then((res) => res.data.results);

export const topAnime: Fetcher<PopularAnime[]> = (url: string) =>
  axios.get(url).then((res) => res.data.results);
