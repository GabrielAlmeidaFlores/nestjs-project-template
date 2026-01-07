import { UnexpectedError } from '@core/error/unexpected.error';

export class McpGetAvailableToolsError extends UnexpectedError {
  protected override readonly _type = McpGetAvailableToolsError.name;

  public constructor(message: string) {
    super(`Erro ao buscar ferramentas no MCP: ${message}`);
  }
}
