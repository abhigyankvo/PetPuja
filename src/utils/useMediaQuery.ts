import { useEffect, useState } from "react";

export function useMediaQuery(query: string) {
  const [matches, setMatches] = useState(window.matchMedia(query).matches);

  useEffect(() => {
    const media = window.matchMedia(query);
    // console.log(media.matches);
    if (media.matches) {
      setMatches(media.matches);
    }
    const listener = () => {
      setMatches(media.matches);
    };
    media.addEventListener("change", listener);
    return () => media.removeEventListener("change", listener);
  }, [matches, query]);
  console.log(matches);
  return matches;
}
export const useIsSmall = () => useMediaQuery("(max-width: 480px)");
// export const useIsMedium = () => {
//   const small = useIsSmall();
//   const medium = useMediaQuery("(max-width: 768px)");
//   return !small && medium;
// };
