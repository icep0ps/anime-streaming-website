import useSWR from 'swr';
import { useParams } from 'react-router-dom';
import { getAnimeDetails } from '../../api/fetchers';

type Props = {};

const Details = (props: Props) => {
  const animeId = useParams().animeid;
  const { data, isLoading } = useSWR(
    `${process.env.GOGO_ANIME_BASE_URL}info/${animeId}`,
    getAnimeDetails
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (data) {
    const { title, description } = data;
    return (
      <main>
        <section className="row-start-2	row-end-3	">
          <header>
            <h1>{title}</h1>
          </header>
          <p>{description}</p>
        </section>
      </main>
    );
  } else {
    return <h1>could not find data</h1>;
  }
};

export default Details;
