import { isInteger, isString } from 'lodash';

export type UserId = number;
export type UserLogin = string;
export type UserPassword = string;

export class User {
  static readonly LOGIN_PATTERN = /^[a-zA-Z\d \-_]+$/g;
  static readonly LOGIN_MAX_LENGTH = 32;
  static readonly LOGIN_MIN_LENGTH = 6;
  static readonly PASSWORD_MAX_LENGTH = 128;
  static readonly PASSWORD_MIN_LENGTH = 6;

  private _id: UserId = 0;
  private _login: UserLogin = '';
  private _password: UserPassword = '';

  get id(): UserId {
    return this._id;
  }

  get login(): UserLogin {
    return this._login;
  }

  get password(): UserPassword {
    return this._password;
  }

  set id(value: Nilable<UserId>) {
    if (isInteger(value)) this._id = value as UserId;
  }

  set login(value: Nilable<UserLogin>) {
    if (isString(value)) this._login = value;
  }

  set password(value: Nilable<UserPassword>) {
    if (isString(value)) this._password = value;
  }

  setId(value: Nilable<UserId>): this {
    this.id = value;
    return this;
  }

  setLogin(value: Nilable<UserLogin>): this {
    this.login = value;
    return this;
  }

  setPassword(value: Nilable<UserPassword>): this {
    this.password = value;
    return this;
  }
}
