import useSWR from 'swr';
import { search } from '../../../../../api/fetchers';

const useFetch = (query: string | undefined) => {
  const url = [`${process.env.ANILIST_BASE_URL}/advanced-search`, query];
  const { data, isLoading, error } = useSWR(query ? url : null, search);
  return { data, isLoading, error };
};

export default useFetch;
