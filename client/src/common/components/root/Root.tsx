import useStore from '../../state/store';
import Search from './components/Search';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

type Props = {};

const Root = (props: Props) => {
  const user = useStore((state) => state.user);
  console.log(user);

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
          <Link
            to={user ? 'http://localhost:2000/signout' : 'http://localhost:3000/signin'}
          >
            <li>{user ? `${user.username}` : 'sign in'}</li>
          </Link>
        </ul>
      </nav>
      <Outlet />
    </main>
  );
};

export default Root;
