import { IS_SERVER } from 'application/constants/side';

export const onServer = (callback: () => void | Promise<void>) => {
  if (IS_SERVER) callback();
};
