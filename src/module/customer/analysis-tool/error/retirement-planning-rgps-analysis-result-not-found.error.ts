import { NotFoundError } from '@core/error/not-found.error';

export class RetirementPlanningRgpsAnalysisResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    RetirementPlanningRgpsAnalysisResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado da análise de RGPS para planejamento de aposentadoria não encontrado',
    );
  }
}
