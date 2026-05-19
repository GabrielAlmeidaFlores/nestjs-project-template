import { InvalidInputError } from '@core/error/invalid-input.error';

export class InvalidAccidentAssistanceTerminatedResultJsonError extends InvalidInputError {
  protected override readonly _type =
    InvalidAccidentAssistanceTerminatedResultJsonError.name;

  public constructor() {
    super(
      'O JSON retornado pela IA para o resultado do termo de assistência acidente está inválido ou incompleto.',
    );
  }
}
