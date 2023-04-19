import useSWR from 'swr';
import useStore from '../../../common/state/store';
import { getWatching } from '../../../api/fetchers';
import Anime from '../../../common/components/Anime';

type Props = {};

const ContinueWatching = (props: Props) => {
  const user = useStore((state) => state.user);

  const { data, isLoading } = useSWR(
    ['http://localhost:2000/continueWatching', user?.userId],
    getWatching
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div>
      <h1>Continue watching</h1>
      <section className="flex flex-wrap gap-5">
        {data ? (
          data.map((anime) => {
            const { id, title, image } = anime;
            console.log(anime);
            return (
              <Anime
                key={id}
                id={id}
                title={title}
                image={image}
                continueFrom={anime.continueFrom}
              />
            );
          })
        ) : (
          <h1>could not find any anime</h1>
        )}
      </section>
    </div>
  );
};

export default ContinueWatching;
