import { useParams } from 'react-router-dom';
import Section from '../../common/components/Section';
import useFetch from '../../common/components/root/components/hooks/useFetch';

const Search = () => {
  const query = useParams().animeid;
  const { data, isLoading, error } = useFetch(query);
  if (isLoading) return <h1>Loading...</h1>;
  return <Section heading={`Results for ${query}`} animes={data} />;
};

export default Search;
