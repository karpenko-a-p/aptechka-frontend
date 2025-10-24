import { isArray, isString } from 'lodash';

export type CategoryId = string;
export type CategoryName = string;
export type CategoryDescription = string;
export type CategoryBanner = string;
export type CategoryKeyword = string;

export interface ICategory {
  id: CategoryId;
  name: CategoryName;
  description: CategoryDescription;
  banner: CategoryBanner;
  keywords: CategoryKeyword[];
}

export abstract class Category {
  static setId(category: ICategory, value: Nilable<CategoryId>): void {
    if (isString(value)) category.id = value;
  }

  static setName(category: ICategory, value: Nilable<CategoryName>): void {
    if (isString(value)) category.name = value;
  }

  static setDescription(category: ICategory, value: Nilable<CategoryDescription>): void {
    if (isString(value)) category.description = value;
  }

  static setBanner(category: ICategory, value: Nilable<CategoryBanner>): void {
    if (isString(value)) category.banner = value;
  }

  static setKeywords(category: ICategory, value: Nilable<CategoryKeyword[]>): void {
    if (isArray(value) && value.every(isString)) category.keywords = value;
  }

  static new(id = '', name = '', description = '', banner = '', keywords: string[] = []): ICategory {
    return { id, name, description, banner, keywords };
  }
}
