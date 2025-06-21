import { IActionResult } from 'application/abstractions/utils';

export const LOGIN_SUCCESS = 1;
export const LOGIN_VALIDATION_ERROR = 2;

export function isLoginSuccess(data: IActionResult): data is IActionResult<null> {
  return data.code === LOGIN_SUCCESS;
}

export function isLoginValidationError(data: IActionResult): data is IActionResult<string[]> {
  return data.code === LOGIN_VALIDATION_ERROR;
}
