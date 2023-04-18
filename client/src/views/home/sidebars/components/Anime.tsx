import React from 'react';
import { Link } from 'react-router-dom';

type Props = {
  id: string;
  title: string;
  image: string;
};

const Anime = ({ id, title, image }: Props) => {
  return (
    <Link to={`/details/${id}`}>
      <article>
        <div style={{ backgroundImage: `${image}` }}></div>
        <h1>{title}</h1>
      </article>
    </Link>
  );
};

export default Anime;
