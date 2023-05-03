import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import useFetch from './hooks/useFetch';
import { useParams } from 'react-router-dom';
import useStore from '../../common/state/store';
import Player from './components/player/Player';
import Section from '../../common/components/Section';
import EpisodeList from './components/episode-list/EpisodeList';

const Watch = () => {
  const episodeid = useParams().episodeid;
  const user = useStore((state) => state.user);
  const anime = useStore((state) => state.anime);
  const episode = useStore((state) => state.episode);
  const { streamingLink, addAnimeToWatching, isLoading } = useFetch({
    episodeid,
  });

  useEffect(() => {
    if (user) {
      const data = {
        ...anime,
        continueFrom: episodeid,
        lastUpdated: Date.now(),
      };
      addAnimeToWatching(data);
    }
  }, [episodeid]);

  if (isLoading) return <h1>Loading...</h1>;

  if (streamingLink && anime) {
    const { headers } = streamingLink;
    const { title, episodes, recommendations } = anime;

    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Watch {title.english || title.romaji} on Forge</title>
        </Helmet>
        <section className=" p-5 flex flex-wrap gap-10">
          <section className="flex gap-3">
            <Player streamingLink={headers.Referer} anime={anime} episode={episode} />
            <EpisodeList episodes={episodes} />
          </section>
          <Section
            heading="Recommendations"
            animes={recommendations.slice(0, 12)}
          ></Section>
        </section>
      </>
    );
  }

  return <h1>Error</h1>;
};

export default Watch;
