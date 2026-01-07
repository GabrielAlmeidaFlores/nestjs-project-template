import { UnexpectedError } from '@core/error/unexpected.error';

export class McpGetDatabaseSchemaError extends UnexpectedError {
  protected override readonly _type = McpGetDatabaseSchemaError.name;

  public constructor(message: string) {
    super(`Erro ao buscar schema no MCP: ${message}`);
  }
}
