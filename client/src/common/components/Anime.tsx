import useSWR from 'swr';
import useStore from '../state/store';
import { Link } from 'react-router-dom';
import { getAnimeDetails } from '../../api/fetchers';
import { useState } from 'react';
import { IAnime } from '../Types';

type Props = {
  anime: IAnime;
  continueFrom?: string;
};

const Anime = ({ anime, continueFrom }: Props) => {
  const setAnime = useStore((state) => state.setAnime);
  const [showSummary, setShowSummary] = useState(true);
  const { id, title, image, popularity, type, status, genres, releaseDate } = anime;

  return (
    <Link
      to={
        continueFrom ? `/watch/${id}/${continueFrom}` : `/details/${title.romaji}/${id}`
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
          <img src={image} className="h-full w-full rounded-md object-cover"></img>
        </div>
        <header>
          <h3 className="font-normal text-xs mt-2 text-center line-clamp-2 	">
            {title.romaji}
          </h3>
        </header>
        <div
          hidden={showSummary}
          className="absolute bg-secondBg top-16 left-20 w-60 z-10 p-3 rounded-lg border border-thirdBg "
        >
          <h3 className="text-sm line-clamp-1 break-words	font-bold">{title.romaji}</h3>
          <span className="text-xs py-2">
            {status} {popularity}
          </span>
          {anime.description ? (
            <>
              <p
                className="line-clamp-4 text-xs "
                dangerouslySetInnerHTML={{ __html: anime.description }}
              ></p>
              <ul className="text-xs">
                <li>Type: {type}</li>
                <li>Aired: {releaseDate}</li>
                <li className="flex gap-2 flex-wrap">
                  Genres:
                  {genres.map((genre) => (
                    <span className="text-main text-xs">{genre}</span>
                  ))}
                </li>
              </ul>
            </>
          ) : (
            <></>
          )}
        </div>
      </article>
    </Link>
  );
};

export default Anime;
