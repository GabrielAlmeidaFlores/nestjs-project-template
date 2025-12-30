import { InvalidInputError } from '@core/error/invalid-input.error';

export class InsufficientCreditsError extends InvalidInputError {
  protected override readonly _type = InsufficientCreditsError.name;

  public constructor() {
    super(
      'A organização não possui créditos suficientes para utilizar este recurso.',
    );
  }
}
