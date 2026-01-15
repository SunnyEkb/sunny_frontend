import { useLayoutEffect } from "react";
import { useLocation } from "react-router-dom";

export const useScrollRestoration = () => {
  const location = useLocation();

  useLayoutEffect(() => {
    const savedScroll = sessionStorage.getItem(`scroll-${location.key}`);

    if (savedScroll) {
      window.scrollTo(0, Number(savedScroll));
    } else {
      window.scrollTo(0, 0);
    }

    const handleScroll = () => {
      sessionStorage.setItem(`scroll-${location.key}`, String(window.scrollY));
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [location]);
};
