type Props = {
  title: string;
  image: string;
};

const Anime = ({ title, image }: Props) => {
  return (
    <article className="w-40 h-68 ">
      <div className="h-5/6">
        <img src={image} className="h-full w-full rounded-lg"></img>
      </div>
      <h1>{title}</h1>
      <details hidden={true}></details>
    </article>
  );
};

export default Anime;
