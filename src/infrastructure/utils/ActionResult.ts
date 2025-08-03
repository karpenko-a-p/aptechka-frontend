/**
 * Результат действия
 */
export interface IActionResult<TPayload = unknown> {
  readonly code: string | number;
  readonly payload: TPayload;
}

export class ActionResult<TPayload = unknown> implements IActionResult<TPayload> {
  constructor(
    public readonly code: string | number,
    public readonly payload: TPayload,
  ) {}
}
