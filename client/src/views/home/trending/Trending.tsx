import 'swiper/css';
import useSWR from 'swr';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import { Autoplay } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { trendingAnime } from '../../../api/fetchers';

type Props = {};

const Trending = (props: Props) => {
  const { data, isLoading } = useSWR('http://localhost:3000/trending', trendingAnime);

  if (isLoading) return <h1>Loading...</h1>;

  return (
    <div className="max-w-fit">
      <Swiper
        modules={[Autoplay]}
        slidesPerView={'auto'}
        fadeEffect={{ crossFade: false }}
        autoplay={true}
        loop={true}
      >
        <SwiperSlide>1</SwiperSlide>
        <SwiperSlide>2</SwiperSlide>
        <SwiperSlide>3</SwiperSlide>
        <SwiperSlide>4</SwiperSlide>
      </Swiper>
    </div>
  );
};
export default Trending;
