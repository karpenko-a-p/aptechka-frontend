import { useEffect, useState } from 'react';

export type UseTransitionReturn = {
  rendered: boolean;
  visible: boolean;
};

/**
 * Переход
 */
export const useTransition = (condition: boolean, duration: number): UseTransitionReturn => {
  const [rendered, setRendered] = useState(condition);
  const [visible, setVisible] = useState(condition);

  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    const safeDelay = 10;

    if (condition) {
      setRendered(true);
      timeoutId = setTimeout(() => setVisible(true), safeDelay);
    } else {
      timeoutId = setTimeout(() => setRendered(false), duration);
      setVisible(false);
    }

    return (): void => clearTimeout(timeoutId);
  }, [condition]);

  return { rendered, visible };
};
