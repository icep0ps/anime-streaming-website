import { Outlet } from 'react-router-dom';

type Props = {};

const Root = (props: Props) => {
  return (
    <main className="root">
      <Outlet />
    </main>
  );
};

export default Root;
