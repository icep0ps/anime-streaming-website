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
      <h1 className="mb-4">Available episode</h1>
      <ul className="flex flex-col gap-3 h-[680px] w-full overflow-scroll	">
        {episodes ? (
          episodes.map((episode) => {
            const { id, number, title } = episode;

            return (
              <li
                className="p-3 bg-thirdBg rounded-lg text-sm"
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
