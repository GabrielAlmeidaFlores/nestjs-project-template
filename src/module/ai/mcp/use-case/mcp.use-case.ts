import { Injectable, Scope } from '@nestjs/common';

import { McpClientGateway } from '@module/ai/mcp/lib/mcp-client/mcp-client.gateway';
import { McpAuthContextUseCase } from '@module/ai/mcp/use-case/extract-tokens.use-case';
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

export type McpCallToolResultType = Awaited<
  ReturnType<McpClientGateway['callTool']>
>;

@Injectable({ scope: Scope.REQUEST })
export class McpUseCase {
  protected readonly _type: string = McpUseCase.name;

  public constructor(
    private readonly client: McpClientGateway,
    private readonly authProvider: McpAuthContextUseCase,
  ) {}

  public listTools(): Promise<ListToolsResult> {
    return this.client.listTools();
  }

  public async callTool(
    toolName: string,
    args: JsonObjectInterface,
  ): Promise<McpCallToolResultType> {
    const auth = this.authProvider.getAuth();

    return this.client.callTool(toolName, {
      ...args,
      __auth: auth,
    });
  }

  public async legalPleadingList(
    dto: ListLegalPleadingRequestDto,
  ): Promise<McpCallToolResultType> {
    return this.callTool('legal_pleading_list', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async legalPleadingGet(
    dto: LegalPleadingId,
  ): Promise<McpCallToolResultType> {
    return this.callTool('legal_pleading_get', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async analysisToolRecordList(
    dto: ListAnalysisToolRecordRequestDto,
  ): Promise<McpCallToolResultType> {
    return this.callTool('analysis_tool_record_list', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async cnisFastAnalysisGet(
    dto: CnisFastAnalysisId,
  ): Promise<McpCallToolResultType> {
    return this.callTool('cnis_fast_analysis_get', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async analysisToolClientList(
    dto: ListDataRequestDto,
  ): Promise<McpCallToolResultType> {
    return this.callTool('analysis_tool_client_list', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async analysisToolClientGet(
    dto: AnalysisToolClientId,
  ): Promise<McpCallToolResultType> {
    return this.callTool('analysis_tool_client_get', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async cnisFastAnalysisPatch(dto: {
    cnisFastAnalysisId: string;
    json?: JsonObjectInterface;
    cnisDocumentPath?: string;
  }): Promise<McpCallToolResultType> {
    return this.callTool(
      'cnis_fast_analysis_patch',
      dto as unknown as JsonObjectInterface,
    );
  }

  public async cnisFastAnalysisPost(
    dto: CnisFastAnalysisId,
  ): Promise<McpCallToolResultType> {
    return this.callTool('cnis_fast_analysis_post', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async legalPleadingPatch(dto: {
    legalPleadingId: LegalPleadingId;
    legalPleadingCompleteAnalysis: string;
  }): Promise<McpCallToolResultType> {
    return this.callTool('legal_pleading_patch_complete_analysis', {
      ...dto,
    } as unknown as JsonObjectInterface);
  }

  public async cnisFastAnalysisPatchCompleteAnalysis(dto: {
    cnisFastAnalysisId: CnisFastAnalysisId;
    cnisCompleteAnalysis: string;
  }): Promise<McpCallToolResultType> {
    return this.callTool(
      'cnis_fast_analysis_patch_complete_analysis',
      dto as unknown as JsonObjectInterface,
    );
  }
}
