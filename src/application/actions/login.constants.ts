import { IActionResult } from 'application/utils/ActionResult';

export const enum LoginResult {
  Success,
  ValidationFailure,
  InvalidLoginOrPassword,
}

export function isLoginSuccess(data: IActionResult): data is IActionResult<null> {
  return data.code === LoginResult.Success;
}

export function isLoginValidationError(data: IActionResult): data is IActionResult<string[]> {
  return data.code === LoginResult.ValidationFailure;
}

export function isInvalidLoginOrPassword(data: IActionResult): data is IActionResult<null> {
  return data.code === LoginResult.InvalidLoginOrPassword;
}