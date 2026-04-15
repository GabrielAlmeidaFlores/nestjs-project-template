import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDeceasedWorkHistoryPeriodNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryPeriodNotFoundError.name;

  public constructor() {
    super(
      'Período do histórico de trabalho do falecido da pensão por morte não encontrado',
    );
  }
}
