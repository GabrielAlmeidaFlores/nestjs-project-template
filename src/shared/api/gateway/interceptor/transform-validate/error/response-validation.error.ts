import { UnexpectedError } from '@core/error/unexpected.error';

export class ResponseValidationError extends UnexpectedError {
  protected override readonly _type = ResponseValidationError.name;

  public constructor(props: {
    dtoProperty: string;
    dtoName: string;
    errorMessage: string;
  }) {
    super(
      `An error was found while validating property '${props.dtoProperty}' in response DTO '${props.dtoName}': ${props.errorMessage}`,
    );
  }
}
