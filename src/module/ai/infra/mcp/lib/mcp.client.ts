import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

import type { ListToolsResult } from '@modelcontextprotocol/sdk/types';

@Injectable()
export class McpClientProvider implements OnModuleInit, OnModuleDestroy {
  protected readonly _type: string = McpClientProvider.name;

  private readonly client: Client;
  private readonly transport: StdioClientTransport;

  private connected: boolean;
  private connectPromise: Promise<void> | null;

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

    this.connected = false;
    this.connectPromise = null;
  }

  public async onModuleInit(): Promise<void> {
    await this.ensureConnected();
  }

  public async onModuleDestroy(): Promise<void> {
    if (!this.connected) {
      return;
    }

    await this.client.close();
    this.connected = false;
    this.connectPromise = null;
  }

  public async listTools(): Promise<ListToolsResult> {
    await this.ensureConnected();
    return this.client.listTools();
  }

  public async callTool<TInput extends Record<string, unknown>>(
    toolName: string,
    input: TInput,
  ): Promise<Awaited<ReturnType<Client['callTool']>>> {
    await this.ensureConnected();

    return this.client.callTool({
      name: toolName,
      arguments: input,
    });
  }

  private async ensureConnected(): Promise<void> {
    if (this.connected) {
      return;
    }

    if (this.connectPromise) {
      await this.connectPromise;
      return;
    }

    this.connectPromise = (async () => {
      await this.client.connect(this.transport);
      this.connected = true;
    })();

    try {
      await this.connectPromise;
    } finally {
      this.connectPromise = null;
    }
  }
}
