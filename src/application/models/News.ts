import { isDate, isInteger, isString } from 'lodash';

export type NewsId = number;
export type NewsName = string;
export type NewsContent = string;
export type NewsDate = Date;

export class News {
  private _id: NewsId = 0;
  private _name: NewsName = '';
  private _content: NewsContent = '';
  private _date: NewsDate = new Date();

  get id(): NewsId {
    return this._id;
  }

  get name(): NewsName {
    return this._name;
  }

  get content(): NewsContent {
    return this._content;
  }

  get date(): NewsDate {
    return this._date;
  }

  set id(value: Nilable<NewsId>) {
    if (isInteger(value)) this._id = value as NewsId;
  }

  set name(value: Nilable<NewsName>) {
    if (isString(value)) this._name = value;
  }

  set content(value: Nilable<NewsContent>) {
    if (isString(value)) this._content = value;
  }

  set date(value: Nilable<NewsDate>) {
    if (isDate(value)) this._date = value;
  }

  setId(value: Nilable<NewsId>): this {
    this.id = value as NewsId;
    return this;
  }

  setName(value: Nilable<NewsName>): this {
    this.name = value;
    return this;
  }

  setContent(value: Nilable<NewsContent>): this {
    this.content = value;
    return this;
  }

  setDate(value: Nilable<NewsDate>): this {
    this.date = value;
    return this;
  }
}
