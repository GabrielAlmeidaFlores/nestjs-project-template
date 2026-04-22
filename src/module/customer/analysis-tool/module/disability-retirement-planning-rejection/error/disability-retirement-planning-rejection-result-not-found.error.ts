import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado do indeferimento de aposentadoria da pessoa com deficiência não encontrado. Por favor, gere o resultado antes de prosseguir.',
    );
  }
}
