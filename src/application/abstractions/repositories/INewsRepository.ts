import { Token } from 'typedi';
import { getService } from 'application/utils';
import { News } from 'application/models/News';

export interface INewsRepository {
  getNewUsersDiscount(): Promise<number>;

  getNews(): Promise<News[]>;

  getNewsById(id: News['id']): Promise<News | null>;
}

export const NEWS_REPOSITORY = new Token<INewsRepository>();

export const newsRepository = () => getService(NEWS_REPOSITORY);
