import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementDenialNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialNotFoundError.name;

  public constructor() {
    super(
      'Análise de indeferimento de aposentadoria urbana comum não encontrada.',
    );
  }
}
