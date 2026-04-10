import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDwhNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDwhNotFoundError.name;

  public constructor() {
    super(
      'Histórico de trabalho do falecido da pensão por morte não encontrado',
    );
  }
}
