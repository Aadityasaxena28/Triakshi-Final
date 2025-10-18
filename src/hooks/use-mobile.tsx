import * as React from "react";

const MOBILE_BREAKPOINT = 768;
const DEBOUNCE_DELAY = 150; // ms delay for smoother resizing performance

export function useIsMobile() {
  const [state, setState] = React.useState(() => ({
    isMobile: typeof window !== "undefined" ? window.innerWidth < MOBILE_BREAKPOINT : false,
    width: typeof window !== "undefined" ? window.innerWidth : 0,
  }));

  React.useLayoutEffect(() => {
    if (typeof window === "undefined") return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        const width = window.innerWidth;
        setState({
          isMobile: width < MOBILE_BREAKPOINT,
          width,
        });
      }, DEBOUNCE_DELAY);
    };

    // Initial check
    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return state; // { isMobile: boolean, width: number }
}

