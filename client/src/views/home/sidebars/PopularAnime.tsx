import Anime from './components/Anime';
import { IAnime } from '../../../common/Types';

type Props = {
  animes: IAnime[];
};

const PopularAnime = (props: Props) => {
  const { animes } = props;

  return (
    <article className="w-full  p-5 rounded-xl flex flex-col gap-3 ">
      <header>
        <h1>Top anime</h1>
      </header>
      <section className=" flex flex-col gap-3 ">
        {animes.map((anime, index) => {
          const { id } = anime;
          return <Anime key={id} anime={anime} />;
        })}
      </section>
    </article>
  );
};

export default PopularAnime;
