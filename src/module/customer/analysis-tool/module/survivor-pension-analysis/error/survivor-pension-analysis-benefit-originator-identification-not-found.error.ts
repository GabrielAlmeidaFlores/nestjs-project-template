import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisBoiNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisBoiNotFoundError.name;

  public constructor() {
    super(
      'Identificação do originador do benefício da pensão por morte não encontrada',
    );
  }
}
