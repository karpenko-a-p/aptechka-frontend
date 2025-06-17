import { INewsRepository, NEWS_REPOSITORY } from 'application/abstractions/repositories';
import { Service } from 'typedi';
import { cache } from 'react';
import { News } from 'application/models/News';
import { onServer } from 'application/utils/onServer';

@Service(NEWS_REPOSITORY)
export class NewsRepository implements INewsRepository {
  private readonly news: News[] = [
    {
      id: 1,
      name: 'Подорожали лекарства',
      content: 'lorem ipsum dolor sit amet. lorem ipsum dolor sit amet. lorem ipsum dolor sit amet.',
      date: new Date('2024-10-12'),
    },
    {
      id: 2,
      name: 'Подорожали лекарства 2',
      content: 'lorem ipsum dolor sit amet.',
      date: new Date('2024-11-13'),
    },
    {
      id: 3,
      name: 'Подорожали лекарства 3',
      content: 'lorem ipsum dolor sit amet.',
      date: new Date('2024-11-05'),
    },
  ];

  constructor() {
    onServer(() => {
      this.getNews = cache(this.getNews.bind(this));
      this.getNewsById = cache(this.getNewsById.bind(this));
      this.getNewUsersDiscount = cache(this.getNewUsersDiscount.bind(this));
    });
  }

  async getNews(): Promise<News[]> {
    return this.news;
  }

  async getNewsById(id: News['id']): Promise<News | null> {
    return this.news.find((news) => news.id === id) ?? null;
  }

  getNewUsersDiscount(): Promise<number> {
    return Promise.resolve(10);
  }
}
