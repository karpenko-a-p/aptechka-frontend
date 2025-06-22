import { IActionResult } from 'application/abstractions/utils';

export const enum LoginResult {
  Success,
  ValidationFailure,
}

export function isLoginSuccess(data: IActionResult): data is IActionResult<null> {
  return data.code === LoginResult.Success;
}

export function isLoginValidationError(data: IActionResult): data is IActionResult<string[]> {
  return data.code === LoginResult.ValidationFailure;
}
