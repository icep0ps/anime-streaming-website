import { Loading } from './Loading';
import { Helmet } from 'react-helmet';
import useFetch from './hooks/useFetch';
import { User } from '../../common/Types';
import useStore from '../../common/state/store';
import { useLoaderData } from 'react-router-dom';
import SpolightBanner from './trending/Trending';
import PopularAnime from './sidebars/PopularAnime';
import Section from '../../common/components/Section';

type Props = {};

const Home = (props: Props) => {
  const user = useLoaderData() as User;

  const setUser = useStore((state) => state.setUser);
  const { Spotlight, Popular, Trending, RecentlyAdded, ContinueWatching, arePagesReady } =
    useFetch();
  if (user) {
    setUser(user);
  }

  if (arePagesReady()) return <Loading />;

  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Forge Homepage</title>
      </Helmet>
      <main className="home flex w-full gap-5 bg-dark justify-evenly ">
        <section className="w-[75%] gap-4 mt-24">
          {Spotlight && <SpolightBanner animes={Spotlight} />}
          <Section heading="Trending" animes={Trending} />
          {user && ContinueWatching?.length > 0 && (
            <Section heading="Contunie watching" animes={ContinueWatching} />
          )}
          <Section heading="Recently added" animes={RecentlyAdded} />
        </section>
        <aside className="mt-24">
          <PopularAnime animes={Popular} />
        </aside>
      </main>
    </>
  );
};

export default Home;
