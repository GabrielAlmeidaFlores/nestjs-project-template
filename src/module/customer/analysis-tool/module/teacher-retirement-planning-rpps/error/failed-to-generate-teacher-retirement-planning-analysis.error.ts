import { UnexpectedError } from '@core/error/unexpected.error';

export class FailedToGenerateTeacherRetirementPlanningRppsAnalysisError extends UnexpectedError {
  protected override readonly _type =
    FailedToGenerateTeacherRetirementPlanningRppsAnalysisError.name;

  public constructor() {
    super(
      'Falha ao gerar a análise do planejamento previdenciário de professor.',
    );
  }
}
