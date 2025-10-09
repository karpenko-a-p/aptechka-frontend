import { IS_SERVER } from 'server/constants/side';

export const onServer = (callback: () => void | Promise<void>): void => {
  if (IS_SERVER) callback();
};
