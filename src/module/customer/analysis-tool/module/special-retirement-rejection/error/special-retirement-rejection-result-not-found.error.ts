import { NotFoundError } from '@core/error/not-found.error';

export class SpecialRetirementRejectionResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialRetirementRejectionResultNotFoundError.name;

  public constructor() {
    super(
      'O resultado da análise de indeferimento de aposentadoria especial não foi encontrado.',
    );
  }
}
