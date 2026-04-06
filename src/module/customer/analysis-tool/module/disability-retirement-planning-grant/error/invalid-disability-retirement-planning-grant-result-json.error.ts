import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidDisabilityRetirementPlanningGrantResultJsonError extends UnexpectedError {
  protected override readonly _type =
    InvalidDisabilityRetirementPlanningGrantResultJsonError.name;

  public constructor() {
    super(
      'Falha ao processar o resultado da concessão de aposentadoria da pessoa com deficiência. JSON inválido ou incompleto.',
    );
  }
}
