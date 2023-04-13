import '../../App.css';
import TopAnime from './sidebars/TopAnime';
import Trending from './trending/Trending';
import TopAiring from './top-airing/TopAiring';

type Props = {};

const Home = (props: Props) => {
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
