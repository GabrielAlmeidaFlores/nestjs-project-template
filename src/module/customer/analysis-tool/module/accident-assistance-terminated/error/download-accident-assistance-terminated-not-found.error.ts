import { NotFoundError } from '@core/error/not-found.error';

export class DownloadAccidentAssistanceTerminatedNotFoundError extends NotFoundError {
  protected override readonly _type =
    DownloadAccidentAssistanceTerminatedNotFoundError.name;

  public constructor() {
    super(
      'Download do diagnóstico para auxílio-acidente (RGPS) não encontrado',
    );
  }
}
