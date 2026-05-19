import { BaseError } from '@core/error/base.error';

export class InvalidSpecialRetirementGrantFirstAnalysisJsonError extends BaseError {
  protected readonly _type =
    InvalidSpecialRetirementGrantFirstAnalysisJsonError.name;

  public constructor() {
    super(
      'Falha ao processar a first analysis da concessão de aposentadoria especial. JSON inválido ou incompleto.',
    );
  }
}
