import { useCallback, useState } from 'react';

/**
 * Булева переменная
 */
export const useBoolean = (initialState = false) => {
  const [value, setValue] = useState(initialState);

  const setTrue = useCallback(() => setValue(true), []);
  const setFalse = useCallback(() => setValue(false), []);
  const toggle = useCallback(() => setValue((val) => !val), []);

  return { value, setFalse, setTrue, toggle };
};
