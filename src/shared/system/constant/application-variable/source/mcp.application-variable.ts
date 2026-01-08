import { EnvironmentVariableService } from '@shared/system/constant/application-variable/implementation/environment-variable/environment-variable.service';

export class McpApplicationVariable {
  public static readonly source = new EnvironmentVariableService();

  public static readonly MCP_SERVER_URL =
    McpApplicationVariable.source.getValueOrDefault<string>(
      'MCP_SERVER_URL',
      String,
      'http://localhost:3001',
    );

  protected readonly _type = McpApplicationVariable.name;
}
