import { InvalidInputError } from '@core/error/invalid-input.error';

export class SpecialRetirementGrantCnisRequiredError extends InvalidInputError {
  protected override readonly _type =
    SpecialRetirementGrantCnisRequiredError.name;

  public constructor() {
    super(
      'É obrigatório o upload do documento CNIS para a concessão de aposentadoria especial',
    );
  }
}
