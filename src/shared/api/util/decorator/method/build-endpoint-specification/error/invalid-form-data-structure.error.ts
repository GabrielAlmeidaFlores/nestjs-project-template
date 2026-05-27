import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidFormDataStructureError extends UnexpectedError {
  protected override readonly _type = InvalidFormDataStructureError.name;

  public constructor() {
    super(
      'Invalid form-data structure: the request must contain only FileModel fields and a single "json" field with the request object.',
    );
  }
}
