import React from 'react';
import AnimeDetails from '../anime-details/AnimeDetails';
import { IAnime, Episode } from '../../../../common/Types';

type Props = {
  streamingLink: string;
  anime: IAnime | undefined;
  episode: Episode | undefined;
};

const Player = ({ streamingLink, anime, episode }: Props) => {
  return (
    <div className="flex flex-col gap-5 ">
      <div className="h-[480px] m-0 aspect-video object-cover">
        <iframe
          style={{}}
          src={streamingLink}
          allowFullScreen={true}
          scrolling="no"
          className="w-full h-full rounded-xl"
          allow="autoplay"
        />
      </div>
      <AnimeDetails anime={anime} episode={episode} />
    </div>
  );
};

export default Player;
