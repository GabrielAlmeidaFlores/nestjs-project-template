import { NotFoundError } from '@core/error/not-found.error';

export class GeneralUrbanRetirementDenialResultNotFoundError extends NotFoundError {
  protected override readonly _type =
    GeneralUrbanRetirementDenialResultNotFoundError.name;

  public constructor() {
    super(
      'Resultado do indeferimento de aposentadoria urbana comum não encontrado. Por favor, realize a primeira análise antes de gerar o resultado completo.',
    );
  }
}
