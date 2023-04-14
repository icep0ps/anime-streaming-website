import Search from './components/Search';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

type Props = {};

const Root = (props: Props) => {
  return (
    <main className="root">
      <nav className="flex justify-between">
        <h1>Forge</h1>
        <Search />
        <ul className="flex  gap-3 justify-evenly w-1/4">
          <Link to={'/'}>
            <li>Home</li>
          </Link>
          <li>Trending</li>
          <li>Profile</li>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
};

export default Root;
