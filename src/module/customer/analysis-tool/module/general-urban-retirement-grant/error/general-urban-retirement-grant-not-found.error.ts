import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementGrantNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementGrantNotFoundError.name;

  public constructor() {
    super('Análise de concessão de aposentadoria urbana geral não encontrada');
  }
}
