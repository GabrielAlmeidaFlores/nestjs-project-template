import { ForbiddenError } from '@core/error/forbidden.error';

export class RegulatoryUpdatesAccessDeniedError extends ForbiddenError {
  protected override readonly _type = RegulatoryUpdatesAccessDeniedError.name;

  public constructor() {
    super(
      'Seu plano não possui acesso às atualizações normativas. Faça um upgrade para acessar este recurso.',
    );
  }
}
