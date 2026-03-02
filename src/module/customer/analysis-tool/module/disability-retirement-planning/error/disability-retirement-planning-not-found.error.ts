import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningNotFoundError.name;

  public constructor() {
    super('Planejamento de aposentadoria da pessoa com deficiência não encontrado');
  }
}
