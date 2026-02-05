import { NotFoundError } from '@core/error/not-found.error';

export class SpecialActivityAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type = SpecialActivityAnalysisNotFoundError.name;

  public constructor() {
    super('Atividade especial não encontrada');
  }
}
