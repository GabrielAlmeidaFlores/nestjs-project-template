import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementDenialTimeAcceleratorNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialTimeAcceleratorNotFoundError.name;

  public constructor() {
    super(
      'Acelerador de tempo da análise de indeferimento de aposentadoria urbana comum não encontrado.',
    );
  }
}
