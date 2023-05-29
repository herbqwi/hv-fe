import { useEffect, useRef, useState } from "react";

const useScroll = (elementRef: any) => {
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (isInView) return;
      const boundingRect = elementRef?.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      // Check if element is in view
      if (boundingRect?.top < windowHeight && boundingRect?.bottom >= 0) {
        setIsInView(true);
      }
    };
    if (elementRef) {
      window.addEventListener('scroll', handleScroll);
    }
    // handleScroll(); // Check on mount

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [elementRef]);
  return isInView;
}

export default useScroll;