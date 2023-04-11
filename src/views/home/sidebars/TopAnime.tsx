import useSWR from 'swr';
import Anime from './components/Anime';
import { topAnime } from '../../../api/fetchers';

const TopAnime = () => {
  const { data, isLoading } = useSWR(`${process.env.ANILIST_BASE_URL}popular`, topAnime);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <article>
      <header>
        <h1>Top anime</h1>
      </header>
      <section>
        {data ? (
          data.map((anime) => {
            const { id, title, image } = anime;
            return <Anime key={id} title={title.userPreferred} image={image} />;
          })
        ) : (
          <h1>could not find any anime </h1>
        )}
      </section>
    </article>
  );
};

export default TopAnime;
