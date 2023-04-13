import useSWR from 'swr';
import useStore from '../state/store';
import { Link } from 'react-router-dom';
import { getAnimeDetails } from '../../api/fetchers';

type Props = {
  id: string;
  title: string;
  image: string;
};

const Anime = ({ id, title, image }: Props) => {
  const setAnime = useStore((state) => state.setAnime);

  const { data: anime, isLoading } = useSWR(
    `${process.env.GOGO_ANIME_BASE_URL}info/${id}`,
    getAnimeDetails
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (anime) {
    const { episodes } = anime;
    const episodeOne = episodes[0].id;

    return (
      <Link to={`watch/${episodeOne}`} onClick={() => setAnime(anime)}>
        <article className="w-40 h-68 ">
          <div className="h-5/6">
            <img src={image} className="h-full w-full rounded-lg"></img>
          </div>
          <h1>{title}</h1>
          <details hidden={true}></details>
        </article>
      </Link>
    );
  }

  return <h1>Error</h1>;
};

export default Anime;
