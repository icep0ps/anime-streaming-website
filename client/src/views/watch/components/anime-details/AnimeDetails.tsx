import { IAnime, Episode } from '../../../../common/Types';

type Props = {
  anime: IAnime | undefined;
  episode: Episode | undefined;
};

const AnimeDetails = ({ anime, episode }: Props) => {
  if (anime && episode) {
    const { description } = anime;
    const { title, number } = episode;
    return (
      <section className="row-start-2	row-end-3	bg-secondBg p-5 rounded-lg flex flex-col gap-3 h-fit">
        <h1>{title || `Episode ${number}`}</h1>
        <p
          dangerouslySetInnerHTML={{ __html: description || 'not found' }}
          className="line-clamp-6"
        ></p>
        <button className="w-28 text-sm">show more</button>
      </section>
    );
  }
  return <h1>Error</h1>;
};

export default AnimeDetails;
