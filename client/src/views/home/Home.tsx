import { Helmet } from 'react-helmet';
import useFetch from './hooks/useFetch';
import { User } from '../../common/Types';
import PopularAnime from './sidebars/PopularAnime';
import SpolightBanner from './trending/Trending';
import useStore from '../../common/state/store';
import { useLoaderData } from 'react-router-dom';
import { useEffect } from 'react';
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
  console.log(arePagesReady());
  if (arePagesReady())
    return (
      <main className="home flex w-full gap-5 bg-dark justify-evenly mt-10">
        <section className="w-[75%] gap-4 flex flex-col gap-5">
          <div
            role="status"
            className="flex items-center justify-center h-56  bg-thirdBg rounded-lg animate-pulse dark:bg-thirdBg"
          ></div>

          <section className="flex gap-5">
            <div
              role="status"
              className="flex items-center justify-center h-64 w-48 bg-thirdBg rounded-lg animate-pulse dark:bg-thirdBg"
            ></div>
          </section>
        </section>
        <aside>
          <div
            role="status"
            className="max-w-md p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"></div>
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"></div>
              </div>
              <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"></div>
            </div>
          </div>
        </aside>
      </main>
    );

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
