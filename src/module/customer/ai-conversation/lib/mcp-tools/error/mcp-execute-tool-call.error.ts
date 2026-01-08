import { UnexpectedError } from '@core/error/unexpected.error';

export class McpExecuteToolCallError extends UnexpectedError {
  protected override readonly _type = McpExecuteToolCallError.name;

  public constructor(props: { toolName: string; message: string }) {
    super(
      `Erro ao executar ferramenta ${props.toolName} no MCP: ${props.message}`,
    );
  }
}
