import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialRetirementGrantAtLeastOnePppRequiredError extends InvalidInputError {
  protected override readonly _type =
    SpecialRetirementGrantAtLeastOnePppRequiredError.name;

  public constructor() {
    super(
      'É obrigatório o upload de pelo menos um documento PPP para a concessão de aposentadoria especial',
    );
  }
}
