import { useCallback, useState } from 'react';

export type UseBooleanReturn = {
  value: boolean;
  setTrue(): void;
  setFalse(): void;
  toggle(): void;
}

/**
 * Булева переменная
 */
export const useBoolean = (initialState = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialState);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((val) => !val), []);

  return { value, setFalse, setTrue, toggle };
};
