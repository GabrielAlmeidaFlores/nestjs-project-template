import { NotFoundError } from '@core/error/not-found.error';

export class BpcElderlyAnalysisLegalProceedingNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcElderlyAnalysisLegalProceedingNotFoundError.name;

  public constructor() {
    super(
      'Processo judicial da análise de BPC ao Idoso não encontrado. Por favor, verifique o ID informado.',
    );
  }
}
