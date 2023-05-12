import useSWR from 'swr';
import useSWRMutation from 'swr/mutation';
import { addToWatching, getStreamingLink } from '../../../api/fetchers';

type Props = {
  episodeid: string | undefined;
};

const useFetch = (props: Props) => {
  const { episodeid } = props;
  const { trigger: addAnimeToWatching } = useSWRMutation(
    '/api/continueWatching',
    addToWatching
  );

  const { data: streamingLink, isLoading } = useSWR(
    `${process.env.GOGO_ANIME_BASE_URL}watch/${episodeid}`,
    getStreamingLink
  );

  return { addAnimeToWatching, isLoading, streamingLink };
};

export default useFetch;
