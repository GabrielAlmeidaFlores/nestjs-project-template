import { NotFoundError } from '@core/error/not-found.error';

export class MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError extends NotFoundError {
  protected override readonly _type =
    MedicalAndSocialReportObjectionGeneratorAnalysisNotFoundError.name;

  public constructor() {
    super(
      'Análise geradora de objeção de laudo médico e social não encontrada',
    );
  }
}
