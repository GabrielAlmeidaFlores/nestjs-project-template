import { InvalidInputError } from '@core/error/invalid-input.error';

export class DataLeaveIsEmptyError extends InvalidInputError {
  protected override readonly _type = DataLeaveIsEmptyError.name;

  public constructor() {
    super('O campo data de saída está vazio');
  }
}
