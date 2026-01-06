import type { JsonObjectInterface } from '@module/ai/mcp/use-case/mcp.use-case';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { AnalysisToolRecordTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/enum/analysis-tool-record-type.enum';
import type { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import type { LegalPleadingId } from '@module/customer/analysis-tool/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import type { AnalysisStatusEnum } from '@module/customer/analysis-tool/domain/schema/enum/analysis-status.enum';

export interface LegalPleadingListToolCallInterface {
  tool: 'legal_pleading_list';
  arguments: {
    page: number;
    limit: number;
    search: string;
    sortField: string;
    field: string;
    status: AnalysisStatusEnum;
    searchBy: string;
  };
}
export interface LegalPleadingGetToolCallInterface {
  tool: 'legal_pleading_get';
  arguments: {
    legalPleadingId: LegalPleadingId;
  };
}
export interface AnalysisToolRecordListToolCallInterface {
  tool: 'analysis_tool_record_list';
  arguments: {
    page: number;
    limit: number;
    search: string;
    sortField: string;
    field: string;
    status: string;
    searchBy: string;
    type: AnalysisToolRecordTypeEnum;
    analysisToolClientId: AnalysisToolClientId;
  };
}
export interface CnisFastAnalysisGetToolCallInterface {
  tool: 'cnis_fast_analysis_get';
  arguments: {
    cnisFastAnalysisId: CnisFastAnalysisId;
  };
}

export interface AnalysisToolClientListToolCallInterface {
  tool: 'analysis_tool_client_list';
  arguments: {
    page: number;
    limit: number;
    search: string;
    sortField: string;
    field: string;
    status: string;
  };
}

export interface AnalysisToolClientGetToolCallInterface {
  tool: 'analysis_tool_client_get';
  arguments: {
    analysisToolClientId: AnalysisToolClientId;
  };
}

export interface CnisFastAnalysisPatchToolCallInterface {
  tool: 'cnis_fast_analysis_patch';
  arguments: {
    cnisFastAnalysisId: string;
    json?: JsonObjectInterface;
    cnisDocumentPath?: string;
  };
}

export interface CnisFastAnalysisPostToolCallInterface {
  tool: 'cnis_fast_analysis_post';
  arguments: {
    cnisFastAnalysisId: CnisFastAnalysisId;
  };
}

export interface LegalPleadingPatchToolCallInterface {
  tool: 'legal_pleading_patch_complete_analysis';
  arguments: {
    legalPleadingId: LegalPleadingId;
    legalPleadingCompleteAnalysis: string;
  };
}

export interface CnisFastAnalysisPatchCompleteAnalysisToolCallInterface {
  tool: 'cnis_fast_analysis_patch_complete_analysis';
  arguments: {
    cnisFastAnalysisId: CnisFastAnalysisId;
    cnisCompleteAnalysis: string;
  };
}

export interface AiTextContentInterface {
  type: 'text';
  text: string;
}

export interface AiResponseInterface {
  content: AiTextContentInterface[];
  isError?: boolean;
}

export type AiToolCallType =
  | LegalPleadingGetToolCallInterface
  | LegalPleadingListToolCallInterface
  | AnalysisToolRecordListToolCallInterface
  | CnisFastAnalysisGetToolCallInterface
  | AnalysisToolClientListToolCallInterface
  | AnalysisToolClientGetToolCallInterface
  | CnisFastAnalysisPatchToolCallInterface
  | CnisFastAnalysisPostToolCallInterface
  | LegalPleadingPatchToolCallInterface
  | CnisFastAnalysisPatchCompleteAnalysisToolCallInterface;
