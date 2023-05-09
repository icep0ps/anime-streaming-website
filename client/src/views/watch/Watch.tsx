import { Helmet } from 'react-helmet';
import useFetch from './hooks/useFetch';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import useStore from '../../common/state/store';
import Player from './components/player/Player';
import Section from '../../common/components/Section';
import useFetchAnime from '../details/hooks/useFetch';
import EpisodeList from './components/episode-list/EpisodeList';

const Watch = () => {
  const episodeid = useParams().episodeid;
  const animeidfromURL = useParams().animeid;
  const user = useStore((state) => state.user);
  const anime = useStore((state) => state.anime);
  const setAnime = useStore((state) => state.setAnime);
  const episode = useStore((state) => state.episode);
  const setEpisode = useStore((state) => state.setEpisode);
  const [animeid, setAnimeid] = useState<string | undefined>(undefined);
  const { streamingLink, addAnimeToWatching, isLoading } = useFetch({
    episodeid,
  });
  const { anime: animeFromAPI, isLoading: isAnimeLoading } = useFetchAnime(animeid);

  useEffect(() => {
    if (user) {
      const data = {
        ...anime,
        id: anime.id,
        continueFrom: episodeid,
        lastUpdated: Date.now(),
      };
      addAnimeToWatching(data);
    }
    if (!anime) {
      setAnimeid(animeidfromURL);
    }
  }, [episodeid]);

  if (isLoading && isAnimeLoading) return <h1>Loading...</h1>;

  if (streamingLink && (anime || animeFromAPI)) {
    if (animeFromAPI) {
      setEpisode(animeFromAPI.episodes.filter((ep) => ep.id !== episodeid)[0]);
      setAnime(animeFromAPI);
    }

    const { headers } = streamingLink;
    const { title, episodes, recommendations } = anime;

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Watch {title.english || title.romaji} on Forge</title>
        </Helmet>
        <section className=" p-5 flex flex-wrap gap-10 ">
          <section className="flex gap-3 w-full mt-20">
            <Player streamingLink={headers.Referer} anime={anime} episode={episode} />
            <EpisodeList animeid={animeid || animeidfromURL} episodes={episodes} />
          </section>
          <Section
            heading="Recommendations"
            animes={recommendations.slice(0, 12)}
          ></Section>
        </section>
      </>
    );
  }
};

export default Watch;
