import 'server-only';

export interface ICategoryEntity {
  id: string;
  name: string;
  description: string;
  banner: string;
}

export interface INewsEntity {
  id: string;
  title: string;
  content: string;
  create_date: Date;
}

export interface IProductEntity {
  id: number;
  name: string;
  description: string;
  category_id: string;
}

export interface IUserEntity {
  id: number;
  login: string;
  password: string;
}
