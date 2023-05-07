import { NavLink, useParams } from 'react-router-dom';
import { Episode } from '../../../../common/Types';
import useStore from '../../../../common/state/store';
import { useEffect } from 'react';

type Props = {
  animeid: string | undefined;
  episodes: Episode[] | undefined;
};

const EpisodeList = (props: Props) => {
  const { animeid, episodes } = props;

  const setEpisode = useStore((state) => state.setEpisode);

  return (
    <aside className="	w-full overflow-hidden">
      <h3 className="mb-4">Available episode</h3>
      <ul
        className={`flex gap-3 h-[680px] w-full overflow-y-scroll scroll ${
          episodes && episodes.length > 25 ? 'flex-wrap' : 'flex-col'
        }`}
      >
        {episodes ? (
          episodes.map((episode) => {
            const { id, number, title } = episode;

            if (episodes.length > 25) {
              return (
                <NavLink
                  to={`/watch/${animeid}/${id}`}
                  className={({ isActive }: { isActive: boolean }) =>
                    isActive
                      ? 'bg-main p-3 rounded-lg text-xs w-10 whitespace-nowrap flex justify-center h-fit'
                      : 'p-3 bg-thirdBg rounded-lg text-xs w-10 whitespace-nowrap flex justify-center h-fit'
                  }
                  onClick={() => setEpisode(episode)}
                  title={title}
                >
                  {number}
                </NavLink>
              );
            }

            return (
              <NavLink
                to={`/watch/${animeid}/${id}`}
                className={({ isActive }: { isActive: boolean }) =>
                  isActive
                    ? 'bg-main p-3 rounded-lg text-xs w-full h-fit'
                    : 'bg-thirdBg p-3 rounded-lg text-xs w-full h-fit'
                }
                onClick={() => setEpisode(episode)}
              >
                {title ? `${number}. ${title}` : `Episode ${number}`}
              </NavLink>
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
