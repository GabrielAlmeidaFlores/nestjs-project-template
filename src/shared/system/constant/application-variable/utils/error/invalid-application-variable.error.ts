import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidApplicationVariableTypeError extends UnexpectedError {
  protected override readonly _type = InvalidApplicationVariableTypeError.name;

  public constructor(props: {
    variableName: string;
    expectedType: string;
    currentValue: string;
  }) {
    super(
      `A variável "${props.variableName}" deveria ser do tipo "${props.expectedType}", mas o valor recebido foi "${props.currentValue}", que não é compatível.`,
    );
  }
}
