import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisBenefitOriginatorIdentificationNotFoundError.name;

  public constructor() {
    super(
      'Identificação do originador do benefício da pensão por morte não encontrada',
    );
  }
}
