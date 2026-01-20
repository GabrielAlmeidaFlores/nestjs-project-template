import { InvalidInputError } from '@core/error/invalid-input.error';

export class MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainSimplifiedAnalysisError extends InvalidInputError {
  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainSimplifiedAnalysisError.name;

  public constructor() {
    super(
      'A análise geradora de objeção de laudo médico e social não contém uma análise simplificada.',
    );
  }
}

