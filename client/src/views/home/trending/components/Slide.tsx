import React from 'react';
import { Link } from 'react-router-dom';
import useStore from '../../../../common/state/store';
import { TrendingAnime } from '../../../../common/Types';

type Props = {
  anime: TrendingAnime;
};

const Slide = ({ anime }: Props) => {
  const setAnime = useStore((state) => state.setAnime);
  const { title, description, cover, link } = anime;

  return (
    <div
      className="bg-cover	h-full object-cover w-full shadow brightness-90"
      style={{
        backgroundImage: `url(${cover}) `,
        backgroundRepeat: 'no-repeat',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <header className=" p-4 z-10 absolute  text-white flex items-center w-full h-full">
        <div className="flex flex-col gap-5 w-3/5 ">
          <h1 className="line-clamp-2 text-3xl font-bold">{title}</h1>
          <p className="line-clamp-3  text-xs">{description}</p>
        </div>
      </header>
    </div>
  );
};

export default Slide;
