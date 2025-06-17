import { isClient } from 'application/constants/side';

export const onClient = (callback: () => void | Promise<void>) => {
  if (isClient) callback();
};
