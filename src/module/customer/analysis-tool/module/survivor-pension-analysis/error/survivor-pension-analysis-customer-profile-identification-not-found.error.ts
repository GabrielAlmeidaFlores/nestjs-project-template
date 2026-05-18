import { NotFoundError } from '@core/error/not-found.error';

export class SurvivorPensionAnalysisCustomerProfileIdentificationNotFoundError extends NotFoundError {
  protected override readonly _type =
    SurvivorPensionAnalysisCustomerProfileIdentificationNotFoundError.name;

  public constructor() {
    super(
      'Identificação do perfil do cliente da pensão por morte não encontrada',
    );
  }
}
