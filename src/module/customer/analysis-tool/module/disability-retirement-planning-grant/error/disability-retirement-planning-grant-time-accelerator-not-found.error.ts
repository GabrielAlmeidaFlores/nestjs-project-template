import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningGrantTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningGrantTimeAcceleratorNotFoundError.name;

  public constructor() {
    super(
      'Acelerador de tempo da análise de concessão de aposentadoria para deficientes não encontrado',
    );
  }
}
