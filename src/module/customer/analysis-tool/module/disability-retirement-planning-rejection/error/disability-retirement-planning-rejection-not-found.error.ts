import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningRejectionNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de aposentadoria da pessoa com deficiência não encontrada.',
    );
  }
}
