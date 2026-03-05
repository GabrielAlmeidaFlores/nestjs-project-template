import { ServiceUnavailableError } from '@core/error/service-unavailable.error';

export class GenerativeIaConnectionError extends ServiceUnavailableError {
  protected override readonly _type = GenerativeIaConnectionError.name;

  public constructor() {
    const message = 'Falha ao conectar com o serviço de IA generativa. ';

    super(message);
  }
}
