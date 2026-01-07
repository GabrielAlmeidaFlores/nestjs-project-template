import { UnexpectedError } from '@core/error/unexpected.error';

export class McpGetDatabaseStatsError extends UnexpectedError {
  protected override readonly _type = McpGetDatabaseStatsError.name;

  public constructor(message: string) {
    super(`Erro ao buscar estatísticas no MCP: ${message}`);
  }
}
