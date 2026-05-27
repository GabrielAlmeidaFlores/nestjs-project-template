import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidApplicationVariableTypeError extends UnexpectedError {
  protected override readonly _type = InvalidApplicationVariableTypeError.name;

  public constructor(props: {
    variableName: string;
    expectedType: string;
    currentValue: string;
  }) {
    super(
      `Environment variable "${props.variableName}" should be of type "${props.expectedType}", but received value of type "${typeof props.currentValue}".`,
    );
  }
}
