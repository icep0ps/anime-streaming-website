import 'swiper/css';
import useSWR from 'swr';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import Slide from './components/Slide';
import { trendingAnime } from '../../../api/fetchers';

type Props = {};

const Trending = (props: Props) => {
  const { data: trending, isLoading } = useSWR(
    'http://localhost:3000/trending',
    trendingAnime
  );

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-4xl	 rounded-xl">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={'auto'}
        fadeEffect={{ crossFade: false }}
        autoplay={true}
        loop={true}
        className="rounded-lg"
      >
        {trending?.map((anime) => (
          <SwiperSlide>
            <Slide anime={anime}></Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default Trending;
