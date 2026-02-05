import { InvalidInputError } from '@core/error/invalid-input.error';

export class DocumentAlreadyAnalyzedError extends InvalidInputError {
  protected override readonly _type = DocumentAlreadyAnalyzedError.name;

  public constructor() {
    super('Este documento já foi analisado anteriormente.');
  }
}
