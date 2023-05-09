import { IAnime } from '../../../../common/Types';

type Props = {
  number?: number;
  anime: IAnime;
  insearch?: boolean;
};

const Anime = (props: Props) => {
  const { number, anime, insearch } = props;
  const { id, title, image, type, rating } = anime;
  return (
    <a href={`/details/${title.userPreferred}/${id}`} className={`flex gap-3  pb-2`}>
      <img src={image} className="h-15 w-12 rounded-lg object-cover"></img>
      <div className="flex flex-col">
        <h1 className="text-xs whitespace-normal">{title.userPreferred}</h1>
        <span className="text-xs">
          {type} · Rating: {rating}{' '}
        </span>
      </div>
    </a>
  );
};

export default Anime;
