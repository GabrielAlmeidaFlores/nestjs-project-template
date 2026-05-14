import { NotFoundError } from '@core/error/not-found.error';

export class ElderlyBpcRejectionCompleteAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    ElderlyBpcRejectionCompleteAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise completa do Indeferimento de BPC Idoso não encontrada. Por favor, realize a análise completa primeiro.',
    );
  }
}
