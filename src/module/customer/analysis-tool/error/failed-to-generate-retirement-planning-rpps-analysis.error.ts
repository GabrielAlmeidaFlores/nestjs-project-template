import { UnexpectedError } from '@core/error/unexpected.error';

export class FailedToGenerateRetirementPlanningRppsAnalysisError extends UnexpectedError {
  protected override readonly _type =
    FailedToGenerateRetirementPlanningRppsAnalysisError.name;

  public constructor() {
    super(
      'Falha ao gerar análise do planejamento previdenciário RPPS. Tente novamente mais tarde.',
    );
  }
}
