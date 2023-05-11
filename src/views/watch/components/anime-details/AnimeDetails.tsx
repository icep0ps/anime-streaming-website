import { useState } from 'react';
import { IAnime, Episode } from '../../../../common/Types';

type Props = {
  anime: IAnime | undefined;
  episode: Episode | undefined;
};

const AnimeDetails = ({ anime, episode }: Props) => {
  const [showDetails, setShowDetails] = useState(false);

  if (anime && episode) {
    const { description, title, genres } = anime;
    const { title: eptitle, number } = episode;
    return (
      <section className="row-start-2	row-end-3	bg-secondBg p-5 rounded-lg flex flex-col gap-3 h-fit border border-thirdBg">
        <h3 className="text-xs p-2 w-fit text-main ">{title.romaji}</h3>
        <h1 className="text-xl font-bold">{eptitle || `Episode ${number}`}</h1>
        <p
          dangerouslySetInnerHTML={{ __html: description || 'not found' }}
          className={`${!showDetails && 'line-clamp-6'} text-sm`}
        ></p>
        <button
          onClick={() => setShowDetails((prev) => !prev)}
          className="bg-main text-xs p-3 w-1/6 rounded-md"
        >
          Show more
        </button>
      </section>
    );
  }
  return <h1>Error</h1>;
};

export default AnimeDetails;
