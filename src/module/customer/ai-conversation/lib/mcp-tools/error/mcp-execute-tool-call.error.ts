import { UnexpectedError } from '@core/error/unexpected.error';

export class McpExecuteToolCallError extends UnexpectedError {
  protected override readonly _type = McpExecuteToolCallError.name;

  public constructor(toolName: string, message: string) {
    super(`Erro ao executar ferramenta ${toolName} no MCP: ${message}`);
  }
}
