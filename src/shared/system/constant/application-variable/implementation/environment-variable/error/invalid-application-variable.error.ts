import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidApplicationVariableTypeError extends UnexpectedError {
  protected override readonly _type = InvalidApplicationVariableTypeError.name;

  public constructor(props: {
    variableName: string;
    expectedType: string;
    currentValue: string;
  }) {
    super(
      `A variável de ambiente "${props.variableName}" deveria ser do tipo "${props.expectedType}", mas o valor recebido foi do tipo"${typeof props.currentValue}"`,
    );
  }
}
