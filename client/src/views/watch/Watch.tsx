import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useStore from '../../common/state/store';
import Player from './components/player/Player';
import { getAnimeDetails } from '../../api/fetchers';
import { getStreamingLink } from '../../api/fetchers';
import EpisodeList from './components/episode-list/EpisodeList';
import AnimeDetails from './components/anime-details/AnimeDetails';

const Watch = () => {
  const episodeId = useParams().episodeid;
  const anime = useStore((state) => state.anime);

  const { data, isLoading } = useSWR(
    `${process.env.GOGO_ANIME_BASE_URL}watch/${episodeId}`,
    getStreamingLink
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (data) {
    const { headers } = data;
    console.log(anime);

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
