import { useEffect, useRef, useState } from 'react';
import debounce from 'lodash.debounce';
import useFetch from './hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import Anime from '../../../../views/home/sidebars/components/Anime';

type Props = {};

const Search = (props: Props) => {
  const ref = useRef(null);

  const isClickOutside = (event: MouseEvent) => {
    event.target !== ref.current && setStartSearch(false);
  };

  useEffect(() => {
    document.addEventListener('click', isClickOutside);
  });

  const navigate = useNavigate();
  const [query, setQuery] = useState<string>('');
  const [startSearch, setStartSearch] = useState(false);
  const debounceReq = debounce(() => setStartSearch(true), 1000);

  return (
    <div>
      <form
        onSubmit={(event) => {
          setStartSearch(false);
          event.preventDefault();
          navigate(`/search/${query}`);
        }}
      >
        <input
          ref={ref}
          type="search"
          placeholder="Search anime..."
          value={query}
          onChange={(event) => {
            setStartSearch(false);
            setQuery(event.target.value);
            debounceReq();
          }}
          className="p-3 rounded-lg outline-none bg-dark text-sm border border-thirdBg"
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
  if (isLoading)
    return (
      <div className="absolute z-10">
        <div
          role="status"
          className="max-w-md p-4 space-y-4 border border-thirdBg divide-y divide-secondBg rounded shadow animate-pulse  md:p-6 "
        >
          <div className="flex items-center justify-between">
            <div>
              <div className="h-2.5 bg-secondBg rounded-full  w-24 mb-2.5"></div>
              <div className="w-32 h-2 bg-secondBg rounded-full"></div>
            </div>
            <div className="h-2.5 bg-secondBg rounded-full w-12"></div>
          </div>
        </div>
        <span className="sr-only">Loading...</span>
      </div>
    );

  if (error)
    return (
      <h1 className="absolute z-10 text-white bg-secondBg p-2 rounded-lg ">
        Something went wrong
      </h1>
    );

  if (data) {
    const topResults = data.slice(0, 5);
    return (
      <div className="absolute z-10 text-white bg-secondBg p-2 rounded-lg ">
        <div className="flex flex-col gap-2">
          {topResults?.map((anime) => {
            return (
              <div
                className="max-w-md   border border-thirdBg divide-y divide-secondBg rounded shadow  p-2 "
                onClick={() => {
                  setStartSearch(false);
                }}
              >
                <Anime anime={anime} insearch></Anime>
              </div>
            );
          })}
        </div>
      </div>
    );
  } else {
    return (
      <p className="absolute z-10 text-white bg-secondBg p-2 rounded-lg ">
        No results found
      </p>
    );
  }
};

export default Search;
