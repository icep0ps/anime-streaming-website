import 'swiper/css';
import '../../../App.css';
import useSWR from 'swr';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper';
import Slide from './components/Slide';
import { Swiper, SwiperSlide } from 'swiper/react';
import { trendingAnime } from '../../../api/fetchers';
import { AnimeDetails } from '../../../common/Types';

type Props = {
  animes: AnimeDetails[];
};

const SpolightBanner = (props: Props) => {
  const { animes } = props;

  return (
    <div className=" rounded-xl ">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={'auto'}
        effect={'fade'}
        autoplay={true}
        loop={true}
        className="rounded-2xl w-[99%] h-96 "
      >
        {animes.map((anime) => (
          <SwiperSlide>
            <Slide anime={anime}></Slide>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};
export default SpolightBanner;
