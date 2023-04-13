import useSWR from 'swr';
import { topAiring } from '../../../api/fetchers';
import Anime from '../../../common/components/Anime';

const TopAiring = () => {
  const { data, isLoading } = useSWR(
    `${process.env.GOGO_ANIME_BASE_URL}top-airing`,
    topAiring
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <article className="">
      <header>
        <h1>TopAiring</h1>
      </header>
      <section className="flex flex-wrap gap-2 justify-between">
        {data ? (
          data.map((anime) => {
            const { id, title, image } = anime;
            return <Anime key={id} id={id} title={title} image={image} />;
          })
        ) : (
          <h1>could not find any anime</h1>
        )}
      </section>
    </article>
  );
};

export default TopAiring;
