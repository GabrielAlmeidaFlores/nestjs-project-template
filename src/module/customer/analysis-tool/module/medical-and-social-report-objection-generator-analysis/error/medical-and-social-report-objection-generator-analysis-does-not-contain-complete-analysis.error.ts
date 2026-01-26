import { InvalidInputError } from '@core/error/invalid-input.error';

export class MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainCompleteAnalysisError extends InvalidInputError {
  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisDoesNotContainCompleteAnalysisError.name;

  public constructor() {
    super(
      'A análise geradora de objeção de laudo médico e social não contém uma análise completa.',
    );
  }
}
