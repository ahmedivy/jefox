import { useCallback, useState } from "react";

export const useCenteredTree = () => {
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [dimensions, setDimensions] = useState();
  const containerRef = useCallback((containerElem) => {
    if (containerElem !== null) {
      const { width, height } = containerElem.getBoundingClientRect();
      setDimensions({ width, height });
      // Center the tree by setting translate to the center of the container
      setTranslate({ x: width / 2, y: 100 });
    }
  }, []);
  return [dimensions, translate, containerRef];
};
