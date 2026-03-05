import { ServiceUnavailableError } from '@core/error/service-unavailable.error';

export class GenerativeIaQuotaExceededError extends ServiceUnavailableError {
  protected override readonly _type = GenerativeIaQuotaExceededError.name;

  public constructor() {
    super(
      'O limite de uso do serviço de IA generativa foi atingido. ' +
        'Por favor, aguarde alguns minutos e tente novamente. ' +
        'Se o problema persistir, entre em contato com o suporte técnico.',
    );
  }
}
