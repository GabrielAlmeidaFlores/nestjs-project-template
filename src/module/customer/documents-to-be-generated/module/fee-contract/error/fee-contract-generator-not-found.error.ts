import { NotFoundError } from '@core/error/not-found.error';

export class FeeContractGeneratorNotFoundError extends NotFoundError {
  protected override readonly _type = FeeContractGeneratorNotFoundError.name;

  public constructor() {
    super('Análise do gerador de contrato de honorários não encontrada.');
  }
}
