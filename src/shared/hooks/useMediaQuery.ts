import { useEffect, useState } from "react";

export const useMediaQuery = (mediaQuery: string) => {
  const [matches, setMatches] = useState(() => matchMedia(mediaQuery).matches);

  useEffect(() => {
    const media = window.matchMedia(mediaQuery);

    const listenerFunc = (e: MediaQueryListEvent) => {
      setMatches(e.matches);
    };
    media.addEventListener("change", listenerFunc);

    return () => media.removeEventListener("change", listenerFunc);
  }, [mediaQuery]);


  return matches;
};
