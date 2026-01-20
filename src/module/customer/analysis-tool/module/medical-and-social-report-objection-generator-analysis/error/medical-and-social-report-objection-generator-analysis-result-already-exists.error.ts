import { InvalidInputError } from '@core/error/invalid-input.error';

export class MedicalAndSocialReportObjectionGeneratorAnalysisResultAlreadyExistsError extends InvalidInputError {
  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisResultAlreadyExistsError.name;

  public constructor() {
    super(
      'Resultado da análise geradora de objeção de laudo médico e social já existe',
    );
  }
}

