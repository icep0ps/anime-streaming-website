import useSWR from 'swr';
import { Helmet } from 'react-helmet';
import useStore from '../../common/state/store';
import { Link, useParams } from 'react-router-dom';
import { getAnimeDetails } from '../../api/fetchers';

type Props = {};

const Details = (props: Props) => {
  const animeId = useParams().animeid;
  const setAnime = useStore((state) => state.setAnime);
  const setEpisode = useStore((state) => state.setEpisode);

  const { data, isLoading } = useSWR(
    `${process.env.ANILIST_BASE_URL}/info/${animeId}`,
    getAnimeDetails
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (data) {
    const { title, description, episodes, image } = data;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Watch {title.english || title.romaji} on Forge</title>
        </Helmet>
        <main className="flex justify-center ">
          <section className="flex flex-col w-5/6  mt-10">
            <div className="flex gap-5 items-center">
              <div className="rounded-lg w-52 h-72">
                <img
                  src={image}
                  alt="poster"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <header className="w-5/6">
                <h1>{title.english || title.romaji}</h1>
                <p dangerouslySetInnerHTML={{ __html: description || 'not found' }}></p>
              </header>
            </div>

            <div>
              <h1 className="my-3">Episodes</h1>
              <ul className="flex gap-2 flex-wrap">
                {episodes.map((episode) => {
                  const { id, number } = episode;
                  return (
                    <Link
                      to={`/watch/${id}`}
                      onClick={() => {
                        setAnime(data);
                        setEpisode(episode);
                      }}
                    >
                      <li className="py-2 rounded-md bg-thirdBg text-center text-sm w-12">
                        {number}
                      </li>
                    </Link>
                  );
                })}
              </ul>
            </div>
          </section>
        </main>
      </>
    );
  } else {
    return <h1>could not find data</h1>;
  }
};

export default Details;
