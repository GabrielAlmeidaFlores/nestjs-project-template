import { UnexpectedError } from '@core/error/unexpected.error';

export class MissingApplicationVariableError extends UnexpectedError {
  protected override readonly _type = MissingApplicationVariableError.name;
}
