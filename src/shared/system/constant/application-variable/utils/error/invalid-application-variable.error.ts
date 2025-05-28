import { UnexpectedError } from '@core/error/unexpected.error';

export class InvalidApplicationVariableTypeError extends UnexpectedError {
  protected override readonly _type = InvalidApplicationVariableTypeError.name;

  public constructor(props: { variableName: string; expectedType: string }) {
    super(
      `A variável ${props.variableName} não é um tipo válido para ${props.expectedType}`,
    );
  }
}
