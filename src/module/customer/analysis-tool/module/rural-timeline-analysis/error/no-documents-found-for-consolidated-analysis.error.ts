import { InvalidInputError } from '@core/error/invalid-input.error';

export class NoDocumentsFoundForConsolidatedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    NoDocumentsFoundForConsolidatedAnalysisError.name;

  public constructor() {
    super(
      'Nenhum documento encontrado nos períodos para gerar análise consolidada',
    );
  }
}
