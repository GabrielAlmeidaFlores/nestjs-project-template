import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidCompleteAnalysisJsonError extends UnexpectedError {
  protected override readonly _type = InvalidCompleteAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a análise completa da atividade especial. JSON inválido.',
    );
  }
}
