import React from 'react';

type Props = {
  title: string;
  image: string;
};

const Anime = ({ title, image }: Props) => {
  return (
    <article>
      <div style={{ backgroundImage: `${image}` }}></div>
      <h1>{title}</h1>
    </article>
  );
};

export default Anime;
