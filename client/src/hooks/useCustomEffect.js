import { useEffect, useRef } from "react";

export function useCustomEffect(callback, dependencies) {
  const isMounted = useRef(false);
  useEffect(() => {
    // Skip the initial render
    if (!isMounted.current) {
      isMounted.current = true;
      return;
    }
    return callback();
  }, dependencies);
}
