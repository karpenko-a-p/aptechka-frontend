import { IS_CLIENT } from 'server/constants/side';

export const onClient = (callback: () => void | Promise<void>): void => {
  if (IS_CLIENT) callback();
};
