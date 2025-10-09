import { InvalidInputError } from '@core/error/invalid-input.error';

export class SamePasswordError extends InvalidInputError {
  protected override readonly _type = SamePasswordError.name;

  public constructor() {
    super('Senha não pode ser a mesma que a antiga.');
  }
}
