import '../../App.css';
import useSWR from 'swr';
import TopAnime from './sidebars/TopAnime';
import Trending from './trending/Trending';
import TopAiring from './top-airing/TopAiring';
import useStore from '../../common/state/store';
import { isUserLoggedIn } from '../../api/fetchers';

type Props = {};

const Home = (props: Props) => {
  const setUser = useStore((state) => state.setUser);

  const { data: user, isLoading } = useSWR(
    'http://localhost:2000/isLoggedIn',
    isUserLoggedIn
  );

  if (isLoading) return <h1>Loading...</h1>;

  if (user) {
    setUser(user);
  }

  return (
    <main className="home flex w-full">
      <section>
        <Trending />
        <TopAiring />
      </section>
      <aside>
        <TopAnime />
      </aside>
    </main>
  );
};

export default Home;
