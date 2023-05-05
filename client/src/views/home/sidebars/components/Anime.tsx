import React from 'react';
import { Link } from 'react-router-dom';
import { IAnime } from '../../../../common/Types';

type Props = {
  number?: number;
  anime: IAnime;
};

const Anime = (props: Props) => {
  const { number, anime } = props;
  const { id, title, image, type, rating } = anime;
  return (
    <a href={`/details/${title.userPreferred}/${id}`} className="flex gap-3 ">
      <img src={image} className="h-15 w-12 rounded-lg object-cover"></img>
      <div className="flex flex-col">
        <h1 className="text-sm whitespace-normal">{title.userPreferred}</h1>
        <span className="text-xs">
          {type} · Rating: {rating}{' '}
        </span>
      </div>
    </a>
  );
};

export default Anime;
