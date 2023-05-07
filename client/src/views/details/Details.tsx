import useSWR from 'swr';
import { Helmet } from 'react-helmet';
import useFetch from './hooks/useFetch';
import useStore from '../../common/state/store';
import { Link, useParams } from 'react-router-dom';

type Props = {};

const Details = (props: Props) => {
  const animeid = useParams().animeid;
  const { anime, isLoading } = useFetch(animeid);
  const setAnime = useStore((state) => state.setAnime);
  const setEpisode = useStore((state) => state.setEpisode);

  if (isLoading) return <h1>Loading...</h1>;
  if (anime) {
    const { title: titles, description, episodes, image, cover } = anime;
    const title = titles.english || titles.romaji;
    return (
      <>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Watch {title} on Forge</title>
        </Helmet>
        <main className="flex justify-center ">
          <section className="flex flex-col w-5/6  mt-10 gap-5">
            <div
              style={{ backgroundImage: `url(${cover})`, backgroundSize: 'cover' }}
              className="h-64 w-full rounded-md"
            ></div>
            <div className="flex gap-5 items-center">
              <div className="rounded-lg w-52 h-72">
                <img
                  src={image}
                  alt="poster"
                  className="object-cover w-full h-full rounded-lg"
                />
              </div>
              <header className="flex w-5/6 flex-col gap-5">
                <h1 className="text-2xl">{title}</h1>
                <p
                  dangerouslySetInnerHTML={{ __html: description || 'not found' }}
                  className="text-sm"
                ></p>
              </header>
            </div>

            <div>
              <h1 className="my-3">Episodes</h1>
              <ul className="flex gap-2 flex-wrap">
                {episodes.map((episode) => {
                  const { id, number } = episode;
                  return (
                    <Link
                      to={`/watch/${animeid}/${id}`}
                      onClick={() => {
                        setAnime(anime);
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
