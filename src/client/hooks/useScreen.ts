import { useEffect, useState } from 'react';
import throttle from 'lodash/throttle';
import { EMPTY_ARRAY } from 'server/utils/structures';

const enum Screen {
  Mobile,
  Tablet,
  Desktop,
}

/**
 * Брэйкпоинт
 */
export const useScreen = (): Record<'mobile' | 'desktop' | 'tablet', boolean> => {
  const [breakpoint, setBreakpoint] = useState(Screen.Desktop);

  useEffect(() => {
    const resize = throttle(() => {
      if (window.innerWidth <= 575)
        return setBreakpoint(Screen.Mobile);

      if (window.innerWidth <= 1200)
        return setBreakpoint(Screen.Tablet);

      setBreakpoint(Screen.Desktop);
    }, 250);

    document.addEventListener('resize', resize);

    return (): void => document.removeEventListener('resize', resize);
  }, EMPTY_ARRAY);

  return {
    mobile: breakpoint === Screen.Mobile,
    tablet: breakpoint === Screen.Tablet,
    desktop: breakpoint === Screen.Desktop,
  };
};
