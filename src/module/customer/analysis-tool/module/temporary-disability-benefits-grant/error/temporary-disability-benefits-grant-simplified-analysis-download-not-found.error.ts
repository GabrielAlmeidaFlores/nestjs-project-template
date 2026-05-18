import { NotFoundError } from '@core/error/not-found.error';

export class TemporaryDisabilityBenefitsGrantSimplifiedAnalysisDownloadNotFoundError extends NotFoundError {
  protected override readonly _type =
    TemporaryDisabilityBenefitsGrantSimplifiedAnalysisDownloadNotFoundError.name;

  public constructor() {
    super(
      'Download da análise simplificada de concessão de benefício por incapacidade temporária não encontrado.',
    );
  }
}
