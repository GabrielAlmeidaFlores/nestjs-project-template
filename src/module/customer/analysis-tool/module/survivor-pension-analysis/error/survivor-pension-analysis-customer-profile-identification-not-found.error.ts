import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisCpiNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisCpiNotFoundError.name;

  public constructor() {
    super(
      'Identificação do perfil do cliente da pensão por morte não encontrada',
    );
  }
}
