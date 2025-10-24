import { isDate, isInteger, isString } from 'lodash';

export type NewsId = number;
export type NewsName = string;
export type NewsContent = string;
export type NewsDate = Date;

export interface INews {
  id: NewsId;
  name: NewsName;
  content: NewsContent;
  date: NewsDate;
}

export abstract class News {
  static new(id = 0, name = '', content = '', date = new Date()): INews {
    return { id, name, content, date };
  }

  static setId(news: INews, value: Nilable<NewsId>): void {
    if (isInteger(value)) news.id = value as NewsId;
  }

  static setName(news: INews, value: Nilable<NewsName>): void {
    if (isString(value)) news.name = value;
  }

  static setContent(news: INews, value: Nilable<NewsContent>): void {
    if (isString(value)) news.content = value;
  }

  static setDate(news: INews, value: Nilable<NewsDate>): void {
    if (isDate(value)) news.date = value;
  }
}
