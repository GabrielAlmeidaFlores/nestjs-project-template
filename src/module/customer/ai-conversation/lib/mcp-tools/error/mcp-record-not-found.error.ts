import { NotFoundError } from '@core/error/not-found.error';

export class McpRecordNotFoundError extends NotFoundError {
  protected override readonly _type = McpRecordNotFoundError.name;

  public constructor() {
    super('Record not found');
  }
}
