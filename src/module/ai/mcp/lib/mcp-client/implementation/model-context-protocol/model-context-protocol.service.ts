import { readFileSync } from 'fs';
import { join } from 'path';

import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PackageJson } from 'type-fest';

import { McpClientGateway } from '@module/ai/mcp/lib/mcp-client/mcp-client.gateway';

import type { ListToolsResult } from '@modelcontextprotocol/sdk/types';

@Injectable()
export class ModelContextProtocolService
  extends McpClientGateway
  implements OnModuleInit, OnModuleDestroy
{
  protected readonly _type: string = ModelContextProtocolService.name;

  private readonly client: Client;
  private readonly transport: StdioClientTransport;

  private connected: boolean;
  private connectPromise: Promise<void> | null;

  public constructor() {
    super();

    const currentWorkingDir = process.cwd();
    const packageJsonPath = join(currentWorkingDir, 'package.json');
    const packageJsonAsString = readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonAsString) as PackageJson;

    this.transport = new StdioClientTransport({
      command: 'node',
      args: ['dist/index.js'],
      cwd: process.env['CWD_PATH'] ?? '',
    });

    this.client = new Client({
      name: packageJson.name ?? 'unknown-client',
      version: packageJson.version ?? '0.0.0',
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
