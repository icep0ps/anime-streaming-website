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
    <div
      className="bg-cover	h-full object-cover w-full "
      style={{
        backgroundImage: `-webkit-linear-gradient(90deg,#161616 10%,rgba(22,22,22,0.40) 50%,rgba(22,22,22,0) 60%,rgba(22,22,22,10%) 70%,#161616 100%) ,url(${coverImage}) `,
        backgroundRepeat: 'no-repeat',
      }}
    >
      <header className=" p-4 z-10 absolute  text-white flex items-end justify-between w-full h-full">
        <div className="w-3/5">
          <h1 className=" line-clamp-2">{title}</h1>
          <p className="line-clamp-3  text-xs">{description}</p>
        </div>

        <div className="flex w-fit">
          <Link to={`watch/${episodeOne}`} onClick={() => setAnime(anime)}>
            <button className="p-3 w-28 text-sm bg-white text-dark ">Watch Now</button>
          </Link>
        </div>
      </header>
    </div>
  );
};

export default Slide;
