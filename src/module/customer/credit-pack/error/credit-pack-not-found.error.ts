import { NotFoundError } from '@core/error/not-found.error';

export class CreditPackNotFoundError extends NotFoundError {
  protected override readonly _type = CreditPackNotFoundError.name;

  public constructor() {
    super(
      'Pacote de créditos não encontrado. Por favor, verifique o ID informado.',
    );
  }
}
