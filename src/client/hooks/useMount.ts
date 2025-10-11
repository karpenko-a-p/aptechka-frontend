import { useEffect } from 'react';
import { EMPTY_ARRAY } from 'server/utils/structures';

export const useMount = (callback: () => unknown): void => {
  useEffect(() => {
    callback();
  }, EMPTY_ARRAY);
};
