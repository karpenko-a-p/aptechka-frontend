import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';

const enum Screen {
  Mobile,
  Tablet,
  Desktop,
}

/**
 * Брэйкпоинт
 */
export const useScreen = () => {
  const [breakpoint, setBreakpoint] = useState(Screen.Mobile);

  useEffect(() => {
    const resize = throttle(() => {
      if (window.innerWidth <= 575)
        return setBreakpoint(Screen.Mobile);

      if (window.innerWidth <= 1200)
        return setBreakpoint(Screen.Tablet);

      setBreakpoint(Screen.Desktop);
    }, 100);

    document.addEventListener('resize', resize);

    return () => document.removeEventListener('resize', resize);
  }, []);

  return {
    mobile: breakpoint === Screen.Mobile,
    tablet: breakpoint === Screen.Tablet,
    desktop: breakpoint === Screen.Desktop,
  };
};
