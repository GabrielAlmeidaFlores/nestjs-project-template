import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDwhpNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDwhpNotFoundError.name;

  public constructor() {
    super(
      'Período do histórico de trabalho do falecido da pensão por morte não encontrado',
    );
  }
}
