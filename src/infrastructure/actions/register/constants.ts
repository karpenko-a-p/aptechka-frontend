import { IActionResult } from 'infrastructure/utils/ActionResult';

export const enum RegisterResult {
  Success,
  ValidationFailure,
  EmailAlreadyInUse,
}

export function isRegisterSuccess(data: IActionResult): data is IActionResult<null> {
  return data.code === RegisterResult.Success;
}

export function isRegisterValidationError(data: IActionResult): data is IActionResult<string[]> {
  return data.code === RegisterResult.ValidationFailure;
}

export function isRegisterEmailAlreadyInUse(data: IActionResult): data is IActionResult<null> {
  return data.code === RegisterResult.EmailAlreadyInUse;
}