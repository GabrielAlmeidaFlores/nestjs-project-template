import { Injectable, OnModuleInit, OnModuleDestroy } from '@nestjs/common';

import { McpClient } from '@module/ai/infra/mcp/lib/mcp.client';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { ListAnalysisToolRecordRequestDto } from '@module/customer/analysis-tool/dto/request/list-analysis-tool-record.request.dto';
import { ListLegalPleadingRequestDto } from '@module/customer/analysis-tool/dto/request/list-legal-pleading.request.dto';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

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

  public async analysisToolRecordList(
    dto: ListAnalysisToolRecordRequestDto,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('analysis_tool_record_list', { ...dto });
  }

  public async cnisFastAnalysisGet(
    dto: CnisFastAnalysisId,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('cnis_fast_analysis_get', { ...dto });
  }

  public async analysisToolClientList(
    dto: ListDataRequestDto,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('analysis_tool_client_list', { ...dto });
  }

  public async analysisToolClientGet(
    dto: AnalysisToolClientId,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('analysis_tool_client_get', { ...dto });
  }

  public async cnisFastAnalysisPatch(dto: {
    cnisFastAnalysisId: string;
    json?: JsonObjectInterface;
    cnisDocumentPath?: string;
  }): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('cnis_fast_analysis_patch', dto);
  }

  public async cnisFastAnalysisPost(
    dto: CnisFastAnalysisId,
  ): Promise<Awaited<ReturnType<McpClient['callTool']>>> {
    return this.client.callTool('cnis_fast_analysis_post', { ...dto });
  }
}
