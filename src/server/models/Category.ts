import { isArray, isString } from 'lodash';

export type CategoryId = string;
export type CategoryName = string;
export type CategoryDescription = string;
export type CategoryBanner = string;
export type CategoryKeyword = string;

export class Category {
  private _id: CategoryId = '';
  private _name: CategoryName = '';
  private _description: CategoryDescription = '';
  private _banner: CategoryBanner = '';
  private _keywords: CategoryKeyword[] = [];

  get id(): CategoryId {
    return this._id;
  }

  get name(): CategoryName {
    return this._name;
  }

  get description(): CategoryDescription {
    return this._description;
  }

  get banner(): CategoryBanner {
    return this._banner;
  }

  get keywords(): CategoryKeyword[] {
    return this._keywords;
  }

  set id(value: Nilable<CategoryId>) {
    if (isString(value)) this._id = value;
  }

  set name(value: Nilable<CategoryName>) {
    if (isString(value)) this._name = value;
  }

  set description(value: Nilable<CategoryDescription>) {
    if (isString(value)) this._description = value;
  }

  set banner(value: Nilable<CategoryBanner>) {
    if (isString(value)) this._banner = value;
  }

  set keywords(value: Nilable<CategoryKeyword[]>) {
    if (isArray(value) && value.every(isString)) this._keywords = value;
  }

  setId(value: Nilable<CategoryId>): this {
    this.id = value;
    return this;
  }

  setName(value: Nilable<CategoryName>): this {
    this.name = value;
    return this;
  }

  setDescription(value: Nilable<CategoryDescription>): this {
    this.description = value;
    return this;
  }

  setBanner(value: Nilable<CategoryBanner>): this {
    this.banner = value;
    return this;
  }

  setKeywords(value: Nilable<CategoryKeyword[]>): this {
    this.keywords = value;
    return this;
  }
}
