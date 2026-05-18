import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de concessão de aposentadoria para deficientes não encontrado',
    );
  }
}
