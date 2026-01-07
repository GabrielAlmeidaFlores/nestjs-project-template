import type { McpDatabaseStatsModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-database-stats.model';
import type { McpQueryResultModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-query-result.model';

export abstract class McpToolsGateway {
  public abstract executeQuery(query: string): Promise<McpQueryResultModel>;

  public abstract validateQuery(query: string): Promise<boolean>;

  public abstract getDatabaseSchema(): Promise<string>;

  public abstract getDatabaseStats(): Promise<McpDatabaseStatsModel>;

  public abstract healthCheck(): Promise<boolean>;

  public abstract getAvailableTools(): Promise<
    Array<{
      name: string;
      description: string;
      parameters: Record<string, unknown>;
    }>
  >;

  public abstract executeToolCall(
    toolName: string,
    parameters: Record<string, unknown>,
  ): Promise<unknown>;
}
