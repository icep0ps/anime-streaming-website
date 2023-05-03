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
          className="p-3 rounded-lg outline-none bg-dark text-sm"
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
  const url = [`${process.env.ANILIST_BASE_URL}/advanced-search`, query];
  const { data, isLoading, error } = useSWR(url, search);

  if (isLoading) return <h1 className="absolute z-10 bg-white">Loading...</h1>;

  if (error) return <h1 className="absolute z-10 bg-white">Something went wrong</h1>;

  if (data) {
    const { results } = data;
    const topResults = results.slice(0, 5);
    return (
      <div className="absolute z-10 text-white bg-secondBg p-2 rounded-lg">
        {topResults?.map((anime) => {
          return <Anime anime={anime}></Anime>;
        })}
      </div>
    );
  } else {
    return <p className="absolute z-10 bg-white">No results found</p>;
  }
};

export default Search;
