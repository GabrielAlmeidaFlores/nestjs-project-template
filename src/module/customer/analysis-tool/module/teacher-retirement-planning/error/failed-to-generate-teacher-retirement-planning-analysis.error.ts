import { UnexpectedError } from '@core/error/unexpected.error';

export class FailedToGenerateTeacherRetirementPlanningAnalysisError extends UnexpectedError {
  protected override readonly _type =
    FailedToGenerateTeacherRetirementPlanningAnalysisError.name;

  public constructor() {
    super('Falha ao gerar a análise do planejamento previdenciário de professor.');
  }
}
