import React from "react";
import defaultPhoto from "../../../../assets/icon/Foto.png";
import style from "./style.module.scss";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { EffectFade, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
// import CustomArrowButton from "./CustomArrowButton/CustomArrowButton";

interface Props {
  imgList: {
    id: number;
    image: string;
  }[];
}

export const enum SwiperArrowType {
  right = "right",
  left = "left",
  none = "none",
}

interface SwiperInstance {
  slideTo: (index: number) => void;
  activeIndex: number;
}

export default function SwipeImg({ imgList }: Props) {
  const [value, setValue] = React.useState(0);
  const [swiper, setSwiper] = React.useState<SwiperInstance | null>(null);

  const handleChangeSlide = (index: number) => {
    setValue(index);
  };

  return (
    <div className={style.section__swipe}>
      {imgList.length > 0 ? (
        <Swiper
          effect={"slide"}
          pagination={{
            dynamicBullets: true,
          }}
          modules={[Pagination, EffectFade, Navigation]}
          slidesPerView={1}
          spaceBetween={15}
          navigation

          // navigation={{
          //   nextEl: '.custom-next-button',
          //   prevEl: '.custom-prev-button',
          // }}
          onSlideChange={(index) => handleChangeSlide(index.activeIndex)}
          onSwiper={(swiper) => {
            setSwiper(swiper);
          }}
        >
          {imgList.map((item, index) => {
            return (
              <SwiperSlide key={index + "swiperSlide"}>
                <img
                  src={item.image ? item.image : defaultPhoto}
                  alt="услуга"
                  className={style.cardPhoto}
                />
              </SwiperSlide>
            );
          })}
          {/* <CustomArrowButton
            onClick={() => console.log("right")}
            variant="right"
          />
          <CustomArrowButton
            onClick={() => console.log("left")}
            variant="left"
          /> */}
        </Swiper>
      ) : (
        <img src={defaultPhoto} alt="услуга" className={style.cardPhoto} />
      )}
    </div>
  );
}
