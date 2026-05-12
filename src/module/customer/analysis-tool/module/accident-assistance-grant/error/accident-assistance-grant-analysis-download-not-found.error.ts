import { NotFoundError } from '@core/error/not-found.error';

export class AccidentAssistanceGrantAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    AccidentAssistanceGrantAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise de concessão de auxílio-acidente não encontrado.',
    );
  }
}
