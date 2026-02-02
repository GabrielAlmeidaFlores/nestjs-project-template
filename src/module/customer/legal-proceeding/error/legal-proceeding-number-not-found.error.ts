import { ForbiddenError } from '@core/error/forbidden.error';

export class LegalProceedingNumberNotFoundError extends ForbiddenError {
  protected override readonly _type = LegalProceedingNumberNotFoundError.name;

  public constructor() {
    super(`Número do processo legal não encontrado.`);
  }
}
