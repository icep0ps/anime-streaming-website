import { useState } from 'react';
import debounce from 'lodash.debounce';
import useFetch from './hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Anime from '../../../../views/home/sidebars/components/Anime';

type Props = {};

const Search = (props: Props) => {
  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [startSearch, setStartSearch] = useState(false);
  const debounceReq = debounce(() => setStartSearch(true), 1000);

  return (
    <div>
      <form
        onSubmit={(event) => {
          event.preventDefault();
          navigate(`/search/${query}`);
        }}
      >
        <input
          type="search"
          placeholder="Search anime..."
          value={query}
          onChange={(event) => {
            setStartSearch(false);
            setQuery(event.target.value);
            debounceReq();
          }}
          className="p-3 rounded-lg outline-none bg-dark text-sm"
        ></input>
      </form>
      {startSearch && <Results query={query} setStartSearch={setStartSearch}></Results>}
    </div>
  );
};

type RProps = {
  query: string;
  setStartSearch: React.Dispatch<React.SetStateAction<boolean>>;
};

const Results = ({ query, setStartSearch }: RProps) => {
  const { data, error, isLoading } = useFetch(query);
  if (isLoading) return <h1 className="absolute z-10 bg-white">Loading...</h1>;

  if (error) return <h1 className="absolute z-10 bg-white">Something went wrong</h1>;

  if (data) {
    const topResults = data.slice(0, 5);
    return (
      <div className="absolute z-10 text-white bg-secondBg p-2 rounded-lg ">
        <div className="flex flex-col gap-4">
          {topResults?.map((anime) => {
            return (
              <div
                onClick={() => {
                  setStartSearch(false);
                }}
              >
                <Anime anime={anime}></Anime>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return <p className="absolute z-10 bg-white">No results found</p>;
  }
};

export default Search;
