import { IAnime, Episode } from '../../../../common/Types';

type Props = {
  anime: IAnime | undefined;
  episode: Episode | undefined;
};

const AnimeDetails = ({ anime, episode }: Props) => {
  if (anime && episode) {
    const { description, title, genres } = anime;
    const { title: eptitle, number } = episode;
    return (
      <section className="row-start-2	row-end-3	bg-secondBg p-5 rounded-lg flex flex-col gap-3 h-fit">
        <h3 className="text-xs p-2 w-fit ">{title.romaji}</h3>
        <h1 className="text-xl">{eptitle || `Episode ${number}`}</h1>
        <p
          dangerouslySetInnerHTML={{ __html: description || 'not found' }}
          className="line-clamp-6 text-sm"
        ></p>
      </section>
    );
  }
  return <h1>Error</h1>;
};

export default AnimeDetails;
