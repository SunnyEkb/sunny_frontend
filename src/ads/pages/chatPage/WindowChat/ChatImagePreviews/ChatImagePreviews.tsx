import { useRef } from "react";
import Delete from "../../../../../assets/icon/close.svg?react";
import ArrowLeft from "../../../../../assets/icon/arrowLeft.svg?react";
import ArrowRigt from "../../../../../assets/icon/arrowRight.svg?react";

import styles from "./styles.module.scss";
import { getCarouselData } from "../helpers";

interface Props {
  images: { id: string; file: File; url: string }[];
  onDelete: (url: string) => void;
}

export default function ChatImagePreviews({ images, onDelete }: Props) {
  const galleryCarouselRef = useRef<HTMLDivElement>(null);
  const translateX = useRef(0);

  return (
    <div className={styles.gallery}>
      <ArrowLeft
        className={styles.arrowIcon}
        width={15}
        onClick={() => {
          const { carousel, step } = getCarouselData(galleryCarouselRef);

          const remainder = Math.abs(translateX.current) % step;
          const pages = Math.floor(Math.abs(translateX.current) / step);
          translateX.current =
            pages > 0
              ? translateX.current + step
              : translateX.current + remainder;
          carousel.style.transform = `translateX(${translateX.current}px)`;
        }}
      />
      <div className={styles.galleryCarousel} ref={galleryCarouselRef}>
        {images?.map(({ id, url }) => {
          return (
            <span className={styles.previewImgsWrapper} key={id}>
              <img
                src={url}
                alt="preview image"
                className={styles.previewImg}
              />
              <Delete
                className={styles.deleteIcon}
                onClick={() => onDelete(url)}
              />
            </span>
          );
        })}
      </div>

      <ArrowRigt
        className={styles.arrowIcon}
        width={15}
        onClick={() => {
          const { carousel, step, itemWidth, gap } =
            getCarouselData(galleryCarouselRef);

          const maxTranslateRight =
            itemWidth * images.length +
            gap * (images.length - 1) -
            carousel.offsetWidth;
          const carouselTranslate =
            maxTranslateRight - Math.abs(translateX.current);

          if (Math.abs(translateX.current) <= maxTranslateRight - itemWidth) {
            translateX.current =
              translateX.current -
              (carouselTranslate % step === 0
                ? step
                : carouselTranslate % step);
            carousel.style.transform = `translateX(${translateX.current}px)`;
          }
        }}
      />
    </div>
  );
}
