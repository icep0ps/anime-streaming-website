import React from 'react';

type Props = {
  anime: { id: string; title: string; description: string; coverImage: string };
};

const Slide = ({ anime }: Props) => {
  const { title, description, coverImage } = anime;
  return (
    <div className="relative h-72 flex items-end">
      <img className="absolute top-0 z-[-1] " src={coverImage}></img>
      <header className=" p-4">
        <h1>{title}</h1>
        <p className="line-clamp-3 w-3/5">{description}</p>
      </header>
      <div className="flex w-fit">
        <button>Watch Now</button>
        <button>More info</button>
      </div>
    </div>
  );
};

export default Slide;
