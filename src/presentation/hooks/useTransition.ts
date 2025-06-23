import { useEffect, useState } from 'react';
import { sleep } from 'application/utils/sleep';

export type UseTransitionProps = {
  /**
   * Время перехода
   */
  time?: number;
  /**
   * Состояние
   */
  state: boolean;
}

/**
 * Переход
 */
export const useTransition = ({ time = 250, state }: UseTransitionProps) => {
  const [rendered, setRendered] = useState(state);
  const [visible, setVisible] = useState(state);

  // Рендер компонента
  useEffect(() => {
    if (state)
      return setRendered(true);

    const timeoutId = setTimeout(() => setRendered(false), time);
    setVisible(false);

    return () => clearTimeout(timeoutId);
  }, [state]);

  // Старт перехода
  useEffect(() => {
    if (rendered)
      sleep(10).then(() => setVisible(true));
  }, [rendered]);

  return { rendered, visible };
};
