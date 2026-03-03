import { UnexpectedError } from '@core/error/unexpected.error';

export class GenerativeIaApiKeyInvalidError extends UnexpectedError {
  protected override readonly _type = GenerativeIaApiKeyInvalidError.name;

  public constructor() {
    super(
      'A chave de API do serviço de IA generativa está inválida ou expirada. ' +
        'Entre em contato com o administrador do sistema para verificar a configuração.',
    );
  }
}
