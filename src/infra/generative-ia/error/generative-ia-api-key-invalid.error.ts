import { ServiceUnavailableError } from '@core/error/service-unavailable.error';

export class GenerativeIaApiKeyInvalidError extends ServiceUnavailableError {
  protected override readonly _type = GenerativeIaApiKeyInvalidError.name;

  public constructor() {
    super(
      'A chave de API do serviço de IA generativa está inválida ou expirada. ' +
        'Entre em contato com o administrador do sistema para verificar a configuração.',
    );
  }
}
