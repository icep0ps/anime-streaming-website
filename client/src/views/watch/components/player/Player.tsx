import React from 'react';

type Props = {
  streamingLink: string;
};

const Player = ({ streamingLink }: Props) => {
  return (
    <div className="h-[480px] m-0 aspect-video">
      <iframe
        src={streamingLink}
        allowFullScreen={true}
        scrolling="no"
        className="w-full h-full rounded-xl"
      />
    </div>
  );
};

export default Player;
