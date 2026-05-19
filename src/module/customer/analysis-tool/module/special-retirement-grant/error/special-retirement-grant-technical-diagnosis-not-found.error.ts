import { NotFoundError } from '@core/error/not-found.error';

export class SpecialRetirementGrantTechnicalDiagnosisNotFoundError extends NotFoundError {
  protected override readonly _type =
    SpecialRetirementGrantTechnicalDiagnosisNotFoundError.name;

  public constructor() {
    super(
      'Diagnostico tecnico de concessao de aposentadoria especial nao encontrado.',
    );
  }
}
