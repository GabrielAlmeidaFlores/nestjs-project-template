import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDeceasedWorkHistoryNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDeceasedWorkHistoryNotFoundError.name;

  public constructor() {
    super(
      'Histórico de trabalho do falecido da pensão por morte não encontrado',
    );
  }
}
