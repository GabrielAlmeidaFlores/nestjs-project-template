import { NotFoundError } from '@core/error/not-found.error';

export class RuralTimelineCnisContributionPeriodDocumentNotFoundError extends NotFoundError {
  protected override readonly _type =
    RuralTimelineCnisContributionPeriodDocumentNotFoundError.name;

  public constructor() {
    super(
      'Documento do período de contribuição CNIS não encontrado. Por favor, verifique o ID informado.',
    );
  }
}
