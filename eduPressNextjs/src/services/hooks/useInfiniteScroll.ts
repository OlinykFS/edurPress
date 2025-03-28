
import { useEffect, useRef } from "react";

export const useInfiniteScroll = (
  callback: () => void,
  isLoading: boolean,
  page: number,
  totalPages: number
) => {
  const lastElementRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const options = { root: null, rootMargin: "20px", threshold: 0.1 };
    const observer = new IntersectionObserver((entries) => {
      const target = entries[0];
      if (target.isIntersecting && !isLoading && page < totalPages - 1) {
        callback();
      }
    }, options);

    if (lastElementRef.current) {
      observer.observe(lastElementRef.current);
    }
    return () => {
      if (lastElementRef.current) {
        observer.unobserve(lastElementRef.current);
      }
    };
  }, [callback, isLoading, page, totalPages]);

  return lastElementRef;
};
