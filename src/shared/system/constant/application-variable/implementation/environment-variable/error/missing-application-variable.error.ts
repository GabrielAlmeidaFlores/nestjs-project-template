import { UnexpectedError } from '@core/error/unexpected.error';

export class MissingApplicationVariableError extends UnexpectedError {
  protected override readonly _type = MissingApplicationVariableError.name;

  public constructor(props: { variableName: string }) {
    super(
      `A variável de ambiente ${props.variableName} não pode ser encontrada`,
    );
  }
}
