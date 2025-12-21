import { ForbiddenError } from '@core/error/forbidden.error';

export class ResourceNotEnabledError extends ForbiddenError {
  protected override readonly _type = ResourceNotEnabledError.name;

  public constructor() {
    super('Este recurso não está habilitado no seu plano de pagamento');
  }
}
