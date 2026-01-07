import { UnexpectedError } from '@core/error/unexpected.error';

export class McpExecuteQueryError extends UnexpectedError {
  protected override readonly _type = McpExecuteQueryError.name;

  public constructor(message: string) {
    super(`Erro ao executar query no MCP: ${message}`);
  }
}
