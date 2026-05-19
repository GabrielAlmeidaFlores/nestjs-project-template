import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDeceasedBenefitDependentsNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedBenefitDependentsNotFoundError.name;

  public constructor() {
    super(
      'Dependentes do benefício do falecido da pensão por morte não encontrado',
    );
  }
}
