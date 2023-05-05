import 'swiper/css';
import '../../../App.css';
import 'swiper/css/autoplay';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css/effect-fade';
import { Autoplay, EffectFade } from 'swiper';
import Slide from './components/Slide';
import { Swiper, SwiperSlide } from 'swiper/react';
import { IAnime } from '../../../common/Types';

type Props = {
  animes: IAnime[];
};

const SpolightBanner = (props: Props) => {
  const { animes } = props;

  return (
    <div className="flex rounded-xl h-96 ">
      <Swiper
        modules={[Autoplay, EffectFade]}
        slidesPerView={'auto'}
        effect={'fade'}
        autoplay={true}
        loop={true}
        className="rounded-2xl flex-shrink w-full"
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
