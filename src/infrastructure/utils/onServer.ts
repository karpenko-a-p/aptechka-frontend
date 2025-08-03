import { IS_SERVER } from 'infrastructure/constants/side';

export const onServer = (callback: () => void | Promise<void>): void => {
  if (IS_SERVER) callback();
};
