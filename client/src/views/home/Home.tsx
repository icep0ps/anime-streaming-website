import '../../App.css';
import { Helmet } from 'react-helmet';
import useFetch from './hooks/useFetch';
import { User } from '../../common/Types';
import PopularAnime from './sidebars/PopularAnime';
import SpolightBanner from './trending/Trending';
import useStore from '../../common/state/store';
import { useLoaderData } from 'react-router-dom';
import Section from '../../common/components/Section';

type Props = {};

const Home = (props: Props) => {
  const user = useLoaderData() as User;
  const setUser = useStore((state) => state.setUser);
  const {
    Spotlight,
    Popular,
    Trending,
    RecentlyAdded,
    ContinueWatching,
    pagesReady,
    FETCH_COUNT,
  } = useFetch();
  if (user) {
    setUser(user);
  }

  if (pagesReady.size !== FETCH_COUNT) return <h1>Loading...</h1>;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forge Homepage</title>
      </Helmet>
      <main className="home flex w-full gap-5 bg-dark justify-evenly ">
        <section className="w-[75%] gap-4">
          <SpolightBanner animes={Spotlight} />
          <Section heading="Trending" animes={Trending} />
          {user && <Section heading="Contunie watching" animes={ContinueWatching} />}
          <Section heading="Recently added" animes={RecentlyAdded} />
        </section>
        <aside>
          <PopularAnime animes={Popular} />
        </aside>
      </main>
    </>
  );
};

export default Home;
