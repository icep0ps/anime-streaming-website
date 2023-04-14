import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../../../common/state/store';
import { TrendingAnime } from '../../../../common/Types';

type Props = {
  anime: TrendingAnime;
};

const Slide = ({ anime }: Props) => {
  const setAnime = useStore((state) => state.setAnime);
  const { title, description, coverImage, episodes } = anime;
  const episodeOne = episodes[0]?.id;
  return (
    <div className="relative h-72 flex items-end text-white	">
      <img className="absolute top-0 z-[-1] " src={coverImage}></img>
      <header className=" p-4">
        <h1>{title}</h1>
        <p className="line-clamp-3 w-3/5">{description}</p>
      </header>
      <div className="flex w-fit">
        <Link to={`watch/${episodeOne}`} onClick={() => setAnime(anime)}>
          <button>Watch Now</button>
        </Link>
      </div>
    </div>
  );
};

export default Slide;
