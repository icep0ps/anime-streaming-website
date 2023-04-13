import { Link } from 'react-router-dom';
import { Episode } from '../../../../common/Types';

type Props = {
  episodes: Episode[] | undefined;
};

const EpisodeList = ({ episodes }: Props) => {
  return (
    <aside className="col-start-2	row-start-1	row-end-2		">
      <h1>Available episode</h1>
      <ul>
        {episodes?.map((episode) => {
          const { id, number, url } = episode;

          return (
            <Link to={`/watch/${id}`}>
              <li>Episode {number}</li>
            </Link>
          );
        })}
      </ul>
    </aside>
  );
};

export default EpisodeList;
