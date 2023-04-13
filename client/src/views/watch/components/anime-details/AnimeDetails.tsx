import { AnimeDetails as AnimeDetailsType } from '../../../../common/Types';

type Props = {
  anime: AnimeDetailsType | undefined;
};

const AnimeDetails = ({ anime }: Props) => {
  if (anime) {
    const { title, description } = anime;
    return (
      <section className="row-start-2	row-end-3	">
        <h1>{title}</h1>
        <p>{description}</p>
      </section>
    );
  }
  return <h1>Error</h1>;
};

export default AnimeDetails;
