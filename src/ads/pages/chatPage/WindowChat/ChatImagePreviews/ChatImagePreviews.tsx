import { useCallback, useEffect, useRef, useState } from "react";
import Delete from "../../../../../assets/icon/close.svg?react";
import ArrowLeft from "../../../../../assets/icon/arrowLeft.svg?react";
import ArrowRigt from "../../../../../assets/icon/arrowRight.svg?react";

import styles from "./styles.module.scss";
import { getCarouselData } from "../helpers";
import { useMediaQuery } from "../../../../../shared/hooks/useMediaQuery";

interface Props {
  images: { id: string; file: File; url: string }[];
  onDelete: (url: string) => void;
}

export default function ChatImagePreviews({ images, onDelete }: Props) {
  const isMobile = useMediaQuery("(max-width: 430px)");
  const [showLeftArrow, setShowLeftArrow] = useState(true);
  const [showRightArrow, setShowRightArrow] = useState(true);
  const galleryCarouselRef = useRef<HTMLDivElement>(null);
  const translateX = useRef(0);
  const getMaxTranslateRight = useCallback(() => {
    const carousel = galleryCarouselRef.current;

    if (!carousel || images.length === 0) return 0;

    const { itemWidth, gap } = getCarouselData(galleryCarouselRef);

    return Math.max(
      0,
      itemWidth * images.length +
        gap * (images.length - 1) -
        carousel.offsetWidth,
    );
  }, [images.length]);

  useEffect(() => {
    const carousel = galleryCarouselRef.current;

    if (!carousel || images.length === 0) return;

    const maxTranslateRight = getMaxTranslateRight();

    const newTranslateX = Math.max(
      -Math.max(0, maxTranslateRight),
      translateX.current,
    );

    if (newTranslateX !== translateX.current) {
      translateX.current = newTranslateX;
      carousel.style.transform = `translateX(${newTranslateX}px)`;
    }
  }, [images, getMaxTranslateRight, isMobile]);

  const updateArrowVisibility = useCallback(() => {
    const carousel = galleryCarouselRef.current;

    if (!carousel || images.length === 0) {
      setShowLeftArrow(false);
      setShowRightArrow(false);
      return;
    }

    const maxTranslateRight = getMaxTranslateRight();

    setShowLeftArrow(translateX.current < 0);
    setShowRightArrow(Math.abs(translateX.current) < maxTranslateRight);
  }, [images, getMaxTranslateRight]);

  useEffect(() => {
    updateArrowVisibility();
  }, [images, updateArrowVisibility]);

  return (
    <div className={styles.gallery}>
      {showLeftArrow && !isMobile && (
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

            updateArrowVisibility();
          }}
        />
      )}

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
      {showRightArrow && !isMobile && (
        <ArrowRigt
          className={styles.arrowIcon}
          width={15}
          onClick={() => {
            const { carousel, step } = getCarouselData(galleryCarouselRef);

            const maxTranslateRight = getMaxTranslateRight();
            const carouselTranslate =
              maxTranslateRight - Math.abs(translateX.current);

            if (carouselTranslate > 0) {
              const shift = Math.min(step, carouselTranslate);
              translateX.current -= shift;

              carousel.style.transform = `translateX(${translateX.current}px)`;
            }
            updateArrowVisibility();
          }}
        />
      )}
    </div>
  );
}
