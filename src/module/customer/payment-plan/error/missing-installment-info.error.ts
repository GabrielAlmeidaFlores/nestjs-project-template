import { UnexpectedError } from '@core/error/unexpected.error';

export class MissingInstallmentInfoError extends UnexpectedError {
  protected override readonly _type = MissingInstallmentInfoError.name;

  public constructor() {
    super('Informações da parcela ausentes.');
  }
}
