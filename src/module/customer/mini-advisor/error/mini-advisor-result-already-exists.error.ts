import { ConflictError } from '@core/error/conflict.error';

export class MiniAdvisorResultAlreadyExistsError extends ConflictError {
  protected override readonly _type = MiniAdvisorResultAlreadyExistsError.name;

  public constructor() {
    super('O resultado do Mini orientador já foi gerado para esta análise.');
  }
}
