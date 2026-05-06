import { NotFoundError } from '@core/error/not-found.error';

export class ElderlyBpcRejectionNotFoundError extends NotFoundError {
  protected override readonly _type = ElderlyBpcRejectionNotFoundError.name;

  public constructor() {
    super(
      'Indeferimento de BPC Idoso não encontrado. Por favor, verifique o ID informado.',
    );
  }
}
