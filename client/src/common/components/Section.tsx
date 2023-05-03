import React from 'react';
import Anime from './Anime';
import { IAnime } from '../Types';

type Props = {
  heading: string;
  animes: IAnime[];
};

const Section = (props: Props) => {
  const { animes, heading } = props;

  return (
    <section>
      <header>
        <h1 className="py-3">{heading}</h1>
      </header>
      <section className="flex flex-wrap justify-start gap-6 ">
        {animes.map((anime) => {
          const { id } = anime;
          return <Anime key={id} anime={anime} />;
        })}
      </section>
    </section>
  );
};

export default Section;
