import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialActivityAtLeastOnePppRequiredError extends InvalidInputError {
  protected override readonly _type =
    SpecialActivityAtLeastOnePppRequiredError.name;

  public constructor() {
    super(
      'É obrigatório o upload de pelo menos um documento PPP para a análise de atividade especial',
    );
  }
}
