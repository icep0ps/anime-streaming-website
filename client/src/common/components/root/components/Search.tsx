import useSWR from 'swr';
import { useState } from 'react';
import { search } from '../../../../api/fetchers';
import Anime from '../../../../views/home/sidebars/components/Anime';

type Props = {};

const Search = (props: Props) => {
  const [query, setQuery] = useState<string>('');
  const queryIsNotEmpty: boolean = query.length > 1;

  return (
    <div>
      <form>
        <input
          type="search"
          placeholder="Search anime..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        ></input>
      </form>
      {queryIsNotEmpty && <Results query={query}></Results>}
    </div>
  );
};

type RProps = {
  query: string;
};

const Results = ({ query }: RProps) => {
  const url = `${process.env.GOGO_ANIME_BASE_URL}${query}`;
  const { data, isLoading, error } = useSWR(url, search);

  if (isLoading) return <h1 className="absolute z-10 bg-white">Loading...</h1>;

  if (error) return <h1 className="absolute z-10 bg-white">Something went wrong</h1>;

  if (data) {
    const { results } = data;
    const topResults = results.slice(0, 5);
    return (
      <div className="absolute z-10 bg-white">
        {topResults.map((anime) => (
          <Anime id={anime.id} title={anime.title} image={anime.image}></Anime>
        ))}
      </div>
    );
  } else {
    return <p className="absolute z-10 bg-white">No results found</p>;
  }
};

export default Search;
