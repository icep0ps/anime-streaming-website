import useSWR from 'swr';
import { useEffect } from 'react';
import useSWRMutation from 'swr/mutation';
import { useParams } from 'react-router-dom';
import useStore from '../../common/state/store';
import Player from './components/player/Player';
import EpisodeList from './components/episode-list/EpisodeList';
import { getStreamingLink, addToWatching } from '../../api/fetchers';
import AnimeDetails from './components/anime-details/AnimeDetails';

const Watch = () => {
  const episodeId = useParams().episodeid;
  const anime = useStore((state) => state.anime);
  const user = useStore((state) => state.user);

  const { trigger } = useSWRMutation(
    'http://localhost:2000/continueWatching',
    addToWatching
  );

  const { data, isLoading } = useSWR(
    `${process.env.GOGO_ANIME_BASE_URL}watch/${episodeId}`,
    getStreamingLink
  );

  useEffect(() => {
    if (user) {
      const data = {
        ...anime,
        continueFrom: episodeId,
        lastUpdated: Date.now(),
      };
      trigger(data);
    }
  }, [episodeId]);

  if (isLoading) return <h1>Loading...</h1>;

  if (data) {
    const { headers } = data;

    return (
      <section className=" p-5 grid grid-cols-[2fr_minmax(900px,_1fr)_500px] grid-rows-2	">
        <Player streamingLink={headers.Referer} />
        <AnimeDetails anime={anime} />
        <EpisodeList episodes={anime?.episodes} />
      </section>
    );
  }

  return <h1>Error</h1>;
};

export default Watch;
