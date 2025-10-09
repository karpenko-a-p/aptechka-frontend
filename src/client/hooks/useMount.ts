import { useEffect } from 'react';

export const useMount = (callback: () => unknown): void => {
  useEffect(() => {
    callback();
  }, []);
};
