import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';

import type { ListToolsResult } from '@modelcontextprotocol/sdk/types';

export class McpClient {
  protected readonly _type = McpClient.name;

  private readonly client: Client;
  private readonly transport: StdioClientTransport;

  public constructor() {
    this.transport = new StdioClientTransport({
      command: 'node',
      args: ['dist/index.js'],
      cwd: process.env['CWD_PATH'] ?? '',
    });

    this.client = new Client({
      name: 'agiliza-previ-back',
      version: '1.0.0',
    });
  }

  public async connect(): Promise<void> {
    await this.client.connect(this.transport);
  }

  public async listTools(): Promise<ListToolsResult> {
    return await this.client.listTools();
  }

  public async callTool<TInput extends Record<string, unknown>>(
    toolName: string,
    input: TInput,
  ): Promise<Awaited<ReturnType<Client['callTool']>>> {
    return await this.client.callTool({
      name: toolName,
      arguments: input,
    });
  }

  public async close(): Promise<void> {
    await this.client.close();
  }
}
