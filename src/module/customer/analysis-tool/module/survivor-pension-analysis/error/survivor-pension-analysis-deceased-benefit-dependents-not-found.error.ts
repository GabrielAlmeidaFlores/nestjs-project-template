import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisDbdNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisDbdNotFoundError.name;

  public constructor() {
    super(
      'Dependentes do benefício do falecido da pensão por morte não encontrado',
    );
  }
}
