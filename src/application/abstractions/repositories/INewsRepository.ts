import { Container, Token } from 'typedi';
import { News } from 'application/models/News';

export interface INewsRepository {
  /**
   * Получение скидки
   */
  getNewUsersDiscount(): Promise<number>;

  /**
   * Получение списка новостей
   */
  getNews(): Promise<News[]>;

  /**
   * Получение новости по идентификатору
   */
  getNewsById(id: News['id']): Promise<Nullable<News>>;
}

export const NEWS_REPOSITORY = new Token<INewsRepository>();

export const newsRepository = () => Container.get(NEWS_REPOSITORY);
