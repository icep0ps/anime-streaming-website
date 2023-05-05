import { NavLink } from 'react-router-dom';
import { Episode } from '../../../../common/Types';
import useStore from '../../../../common/state/store';

type Props = {
  episodes: Episode[] | undefined;
};

const EpisodeList = (props: Props) => {
  const { episodes } = props;
  const setEpisode = useStore((state) => state.setEpisode);

  return (
    <aside className="	w-full ">
      <h3 className="mb-4">Available episode</h3>
      <ul
        className={`flex gap-3 h-[680px] w-full overflow-y-scroll scroll  ${
          episodes && episodes.length > 25 ? 'flex-wrap' : 'flex-col'
        }`}
      >
        {episodes ? (
          episodes.map((episode) => {
            const { id, number, title } = episode;

            if (episodes.length > 25) {
              return (
                <li
                  className="p-3 bg-thirdBg rounded-lg text-xs w-10 whitespace-nowrap flex justify-center h-fit"
                  onClick={() => setEpisode(episode)}
                  title={title}
                >
                  <NavLink
                    to={`/watch/${id}`}
                    className={({ isActive }: { isActive: boolean }) =>
                      isActive ? 'bg-orange-500 ' : ''
                    }
                  >
                    {number}
                  </NavLink>
                </li>
              );
            }

            return (
              <li
                className="p-3 bg-thirdBg rounded-lg text-xs w-full h-fit"
                onClick={() => setEpisode(episode)}
              >
                <NavLink
                  to={`/watch/${id}`}
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive ? 'bg-orange-500 ' : ''
                  }
                >
                  {title ? title : `Episode ${number}`}
                </NavLink>
              </li>
            );
          })
        ) : (
          <h1>no episodes at the moment</h1>
        )}
      </ul>
    </aside>
  );
};

export default EpisodeList;
