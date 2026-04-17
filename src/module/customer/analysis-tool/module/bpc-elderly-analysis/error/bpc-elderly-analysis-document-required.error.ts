import { InvalidInputError } from '@core/error/invalid-input.error';

export class BpcElderlyAnalysisDocumentRequiredError extends InvalidInputError {
  protected override readonly _type =
    BpcElderlyAnalysisDocumentRequiredError.name;

  public constructor() {
    super(
      'É necessário enviar ao menos um documento (CNIS ou CAD Único) para a análise de BPC ao Idoso.',
    );
  }
}
