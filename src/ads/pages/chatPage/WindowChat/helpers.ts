export const validImageTypes = ["image/jpeg", "image/png", "image/gif"];

export function imageValidation(file: File): boolean {
  const maxSizeInBytes = 5 * 1024 * 1024;
  return validImageTypes.includes(file.type) && file.size <= maxSizeInBytes;
}

export const getCarouselData = (galleryCarouselRef: React.RefObject<HTMLDivElement>) => {
  const carousel = galleryCarouselRef.current!;
  const itemWidth = carousel.children[0].clientWidth;
  const gap = parseInt(getComputedStyle(carousel).gap) || 0;

  return {
    carousel,
    itemWidth,
    gap,
    step: itemWidth + gap,
  };
};
