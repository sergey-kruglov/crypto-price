export class ErrorResDto {
  readonly success = false;

  constructor(readonly error: string) {}
}
