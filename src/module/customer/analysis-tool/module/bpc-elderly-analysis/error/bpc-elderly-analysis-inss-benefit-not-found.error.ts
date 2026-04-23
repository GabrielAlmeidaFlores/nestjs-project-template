import { NotFoundError } from '@core/error/not-found.error';

export class BpcElderlyAnalysisInssBenefitNotFoundError extends NotFoundError {
  protected override readonly _type =
    BpcElderlyAnalysisInssBenefitNotFoundError.name;

  public constructor() {
    super(
      'Benefício INSS da análise de BPC ao Idoso não encontrado. Por favor, verifique o ID informado.',
    );
  }
}
