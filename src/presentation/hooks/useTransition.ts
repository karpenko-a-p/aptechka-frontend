import { useEffect, useState } from 'react';
import { sleep } from 'infrastructure/utils/sleep';

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

export type UseTransitionReturn = {
  rendered: boolean;
  visible: boolean;
}

/**
 * Переход
 */
export const useTransition = ({ time = 250, state }: UseTransitionProps): UseTransitionReturn => {
  const [rendered, setRendered] = useState(state);
  const [visible, setVisible] = useState(state);

  // Рендер компонента
  useEffect(() => {
    if (state)
      return setRendered(true);

    const timeoutId = setTimeout(() => setRendered(false), time);
    setVisible(false);

    return (): void => clearTimeout(timeoutId);
  }, [state]);

  // Старт перехода
  useEffect(() => {
    if (rendered)
      sleep(10).then(() => setVisible(true));
  }, [rendered]);

  return { rendered, visible };
};
