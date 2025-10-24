import { isInteger, isNil, isString } from 'lodash';

export type UserId = number;
export type UserLogin = string;
export type UserPassword = string;

export interface IUser {
  id: UserId;
  login: UserLogin;
  password: UserPassword;
}

export abstract class User {
  static readonly LOGIN_PATTERN = /^[a-zA-Z\d \-_]+$/g;
  static readonly LOGIN_MAX_LENGTH = 32;
  static readonly LOGIN_MIN_LENGTH = 6;
  static readonly PASSWORD_MAX_LENGTH = 128;
  static readonly PASSWORD_MIN_LENGTH = 6;

  static new(id = 0, login = '', password = ''): IUser {
    return { id, login, password };
  }

  static setId(user: IUser, value: Nilable<UserId>): void {
    if (!isNil(value) && isInteger(value)) user.id = value;
  }

  static setLogin(user: IUser, value: Nilable<UserLogin>): void {
    if (isString(value)) user.login = value;
  }

  static setPassword(user: IUser, value: Nilable<UserPassword>): void {
    if (isString(value)) user.password = value;
  }
}
