import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { McpClient } from '@module/ai/infra/mcp/lib/mcp.client';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading.request.dto';

import type { ListToolsResult } from '@modelcontextprotocol/sdk/types';

export type JsonPrimitiveType = string | number | boolean | null;
export type JsonValueType =
  | JsonPrimitiveType
  | JsonObjectInterface
  | JsonArrayType;
export interface JsonObjectInterface {
  [key: string]: JsonValueType;
}
export type JsonArrayType = Array<JsonValueType>;

@Injectable()
export class McpUseCase implements OnModuleInit, OnModuleDestroy {
  protected readonly _type: string = McpUseCase.name;

  private readonly client: McpClient = new McpClient();

  public async onModuleInit(): Promise<void> {
    await this.client.connect();
  }

  public async onModuleDestroy(): Promise<void> {
    await this.client.close();
  }

  public async listTools(): Promise<ListToolsResult> {
    return this.client.listTools();
  }

  public async callTool(
    toolName: string,
    args: JsonObjectInterface,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool(toolName, args);
  }

  public async consultarPje(
    numeroProcesso: string,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('consultar_pje', {
      numeroProcesso,
    });
  }

  public async consultarUsuarios(): Promise<
    Awaited<ReturnType<McpClient['callTool']>>
  > {
    return this.client.callTool('consultar_usuarios', {});
  }

  public async legalPleadingList(
    dto: ListLegalPleadingRequestDto,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('legal_pleading_list', { ...dto });
  }

  public async legalPleadingGet(
    dto: LegalPleadingId,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('legal_pleading_get', { ...dto });
  }
}
