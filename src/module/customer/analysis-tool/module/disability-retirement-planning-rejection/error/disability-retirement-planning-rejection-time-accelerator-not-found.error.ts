import { NotFoundError } from '@core/error/not-found.error';

export class DisabilityRetirementPlanningRejectionTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    DisabilityRetirementPlanningRejectionTimeAcceleratorNotFoundError.name;

  public constructor() {
    super(
      'Acelerador de tempo de indeferimento de aposentadoria da pessoa com deficiência não encontrado.',
    );
  }
}
