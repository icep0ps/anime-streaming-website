import useSWR from 'swr';
import React from 'react';
import useStore from '../../../common/state/store';

type Props = {};

const ContinueWatching = (props: Props) => {
  const user = useStore((state) => state.user);

  const { data, isLoading } = useSWR();

  return <div>ContinueWatching</div>;
};

export default ContinueWatching;
