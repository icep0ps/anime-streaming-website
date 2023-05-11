import { Loading } from './Loading';
import { useParams } from 'react-router-dom';
import Section from '../../common/components/Section';
import useFetch from '../../common/components/root/components/hooks/useFetch';

const Search = () => {
  const query = useParams().animeid;
  const { data, isLoading, error } = useFetch(query);
  if (isLoading) return <Loading />;
  return (
    <main className="home flex w-full gap-5 bg-dark justify-evenly ">
      <div className="mt-20 w-full">
        <Section heading={`Results for ${query}`} animes={data} />
      </div>
    </main>
  );
};

export default Search;
