import useSWR from 'swr';
import { getAnimeDetails } from '../../../api/fetchers';

type Props = {};

const useFetch = (animeid: string | undefined) => {
  const { data: anime, isLoading } = useSWR(
    animeid ? `${process.env.ANILIST_BASE_URL}/info/${animeid}` : null,
    getAnimeDetails
  );

  return { anime, isLoading };
};

export default useFetch;
