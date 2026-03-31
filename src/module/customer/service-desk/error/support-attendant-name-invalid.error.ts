import { InvalidInputError } from '@core/error/invalid-input.error';

export class SupportAttendantNameInvalidError extends InvalidInputError {
  protected override readonly _type = SupportAttendantNameInvalidError.name;

  public constructor() {
    super(
      'Nome inválido. O nome deve conter pelo menos 2 palavras e usar apenas letras e espaços.',
    );
  }
}
