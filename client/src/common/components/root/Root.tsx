import '../../../App.css';
import useStore from '../../state/store';
import Search from './components/Search';
import { Outlet } from 'react-router-dom';
import { Link } from 'react-router-dom';

type Props = {};

const Root = (props: Props) => {
  const user = useStore((state) => state.user);

  return (
    <>
      <nav className="flex p-3 bg-secondBg  border border-thirdBg fixed z-10 w-screen justify-center ">
        <div className="flex w-[65%] justify-between ">
          <div className="flex items-center justify-between w-3/12">
            <h1 className="whitespace-nowrap mr-10">Forge anime streaming</h1>
            <Search />
          </div>
          <ul className="flex  gap-3 justify-evenly w-1/4 text-sm items-center">
            <Link to={'/'}>
              <li>Home</li>
            </Link>
            <Link
              to={user ? 'http://localhost:2000/signout' : 'http://localhost:3000/signin'}
            >
              <li>{user ? `${user.username}` : 'sign in'}</li>
            </Link>
          </ul>
        </div>
      </nav>
      <main className="root ">
        <Outlet />
      </main>
    </>
  );
};

export default Root;
