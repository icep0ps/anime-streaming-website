import useSWR from 'swr';
import useStore from '../state/store';
import { Link } from 'react-router-dom';
import { getAnimeDetails } from '../../api/fetchers';
import { useState } from 'react';
import { AnimeDetails } from '../Types';

type Props = {
  anime: AnimeDetails;
  continueFrom?: string;
};

const Anime = ({ anime, continueFrom }: Props) => {
  const setAnime = useStore((state) => state.setAnime);
  const [showSummary, setShowSummary] = useState(true);
  const { id, title, image, totalEpisodes, type, status, genres, releaseDate } = anime;

  return (
    <Link
      to={
        continueFrom ? `/watch/${continueFrom}` : `/details/${title.userPreferred}/${id}`
      }
      onClick={() => setAnime(anime)}
    >
      <article
        className="w-40 h-full relative"
        onMouseEnter={() => setShowSummary(false)}
        onMouseLeave={() => setShowSummary(true)}
      >
        <div className=" relative h-60">
          <span className="bg-main p-1 rounded-md absolute m-2 text-xs">HD</span>
          <img src={image} className="h-full w-full rounded-lg object-cover"></img>
        </div>
        <header>
          <h3 className="font-normal text-sm text-center line-clamp-2 break-all	">
            {title.userPreferred}
          </h3>
        </header>
        <div hidden={showSummary} className="summary">
          <h3 className="text-base line-clamp-1 break-words	">{title.userPreferred}</h3>
          <span className="text-xs py-2">
            {status} {totalEpisodes}
          </span>
          <p className="line-clamp-4 text-xs my-2">{anime.description}</p>
          <ul className="text-xs">
            <li>Aired: {releaseDate}</li>
            <li>Type: {type}</li>
            <li className="line-clamp-1	">Genres: {genres?.join(' ,')}</li>
          </ul>
          <div className="flex gap-2">
            <button className="text-xs my-2 ">Details</button>
            <button className="text-xs my-2">Details</button>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Anime;
