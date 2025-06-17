import { isServer } from 'application/constants/side';

export const onServer = (callback: () => void | Promise<void>) => {
  if (isServer) callback();
};
