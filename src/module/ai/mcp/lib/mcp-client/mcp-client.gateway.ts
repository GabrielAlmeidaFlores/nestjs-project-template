import type { Client } from '@modelcontextprotocol/sdk/client/index.js';
import type { ListToolsResult } from '@modelcontextprotocol/sdk/types';

export abstract class McpClientGateway {
  public abstract listTools(): Promise<ListToolsResult>;

  public abstract callTool<TInput extends Record<string, unknown>>(
    toolName: string,
    input: TInput,
  ): Promise<Awaited<ReturnType<Client['callTool']>>>;
}
