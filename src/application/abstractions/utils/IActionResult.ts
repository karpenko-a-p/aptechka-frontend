/**
 * Результат действия
 */
export interface IActionResult<TPayload = unknown> {
  code: string | number;
  payload: TPayload;
}