import React from 'react';
import { Link } from 'react-router-dom';
import { AnimeDetails } from '../../../../common/Types';

type Props = {
  number?: number;
  anime: AnimeDetails;
};

const Anime = (props: Props) => {
  const { number, anime } = props;
  const { id, title, image, type, rating } = anime;
  return (
    <Link to={`/details/${title.userPreferred}/${id}`}>
      <article className="w-full flex py-1">
        <div className="flex gap-2 place-items-center ">
          <div className=" w-4 mx-1 self-start text-right">
            <h3>{number}</h3>
          </div>
          <img src={image} className="h-15 w-12 rounded-lg object-cover"></img>
          <div className="flex flex-col">
            <h1 className="text-sm whitespace-normal">{title.userPreferred}</h1>
            <span className="text-xs">
              {type} · Rating: {rating}{' '}
            </span>
          </div>
        </div>
      </article>
    </Link>
  );
};

export default Anime;
