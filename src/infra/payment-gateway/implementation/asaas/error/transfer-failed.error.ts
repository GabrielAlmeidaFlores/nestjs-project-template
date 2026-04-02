import { InvalidInputError } from '@core/error/invalid-input.error';

export class TransferFailedError extends InvalidInputError {
  protected override readonly _type = TransferFailedError.name;

  public constructor(props: { message: string }) {
    super(props.message);
  }
}
