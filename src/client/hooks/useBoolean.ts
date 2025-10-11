import { useCallback, useState } from 'react';
import { EMPTY_ARRAY } from 'server/utils/structures';

export type UseBooleanReturn = {
  value: boolean;
  setTrue(): void;
  setFalse(): void;
  toggle(): void;
}

const REVERSE_BOOL_FUNC = (value: boolean): boolean => !value;

/**
 * Булева переменная
 */
export const useBoolean = (initialState = false): UseBooleanReturn => {
  const [value, setValue] = useState(initialState);

  const setTrue = useCallback(() => setValue(true), EMPTY_ARRAY);
  const setFalse = useCallback(() => setValue(false), EMPTY_ARRAY);
  const toggle = useCallback(() => setValue(REVERSE_BOOL_FUNC), EMPTY_ARRAY);

  return { value, setFalse, setTrue, toggle };
};
