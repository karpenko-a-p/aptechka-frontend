import 'server-only';
import { schedule } from 'node-cron';
import { Logger } from 'server/services/Logger';

export abstract class CronJobs {
  private static initialized = false;

  static init(): void {
    if (CronJobs.initialized) return;

    CronJobs.initialized = true;

    schedule('* * * * *', () => Logger.info('Cronjob for every minute'));

    schedule('*/5 * * * *', () => Logger.info('Cronjob for every 5 minutes'));
  }
}
