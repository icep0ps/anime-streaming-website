import '../../App.css';
import TopAnime from './sidebars/TopAnime';
import { User } from '../../common/Types';
import Trending from './trending/Trending';
import TopAiring from './top-airing/TopAiring';
import useStore from '../../common/state/store';
import { useLoaderData } from 'react-router-dom';
import ContinueWatching from './continue-watching/ContinueWatching';

type Props = {};

const Home = (props: Props) => {
  const setUser = useStore((state) => state.setUser);
  const user = useLoaderData() as User;

  if (user) {
    setUser(user);
  }

  return (
    <main className="home flex w-full">
      <section>
        <Trending />
        <TopAiring />
        {user && <ContinueWatching />}
      </section>
      <aside>
        <TopAnime />
      </aside>
    </main>
  );
};

export default Home;
