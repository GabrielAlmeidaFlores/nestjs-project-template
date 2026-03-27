import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementGrantResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de concessão de aposentadoria urbana geral não encontrado',
    );
  }
}
