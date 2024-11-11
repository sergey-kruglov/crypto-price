export class SuccessResDto<T = unknown> {
  readonly success = true;

  constructor(readonly data?: T) {}
}
