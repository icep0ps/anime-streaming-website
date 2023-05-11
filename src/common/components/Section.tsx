import Anime from './Anime';
import { IAnime, Recommendations } from '../Types';

type Props = {
  heading: string;
  animes: IAnime[] | Recommendations[];
};

const Section = (props: Props) => {
  const { animes, heading } = props;

  return (
    <section>
      <header>
        <h1 className="py-3 text-2xl font-extrabold	">{heading}</h1>
      </header>
      <section className="flex flex-wrap justify-start gap-6 ">
        {animes?.map((anime) => {
          const { id } = anime;
          return <Anime anime={anime} />;
        })}
      </section>
    </section>
  );
};

export default Section;
