import { Injectable } from '@nestjs/common';

import { McpExecuteToolCallError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-execute-tool-call.error';
import { McpAnalysisRecordHandler } from '@module/customer/ai-conversation/lib/mcp-tools/handler/mcp-analysis-record.handler';
import { McpClientHandler } from '@module/customer/ai-conversation/lib/mcp-tools/handler/mcp-client.handler';
import { McpLegalPleadingHandler } from '@module/customer/ai-conversation/lib/mcp-tools/handler/mcp-legal-pleading.handler';
import { McpToolsGateway } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.gateway';
import { McpDatabaseStatsModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-database-stats.model';
import { McpQueryResultModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-query-result.model';
import { McpToolModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-tool.model';

@Injectable()
export class InternalAnalysisToolsService extends McpToolsGateway {
  protected readonly _type = InternalAnalysisToolsService.name;

  public constructor(
    private readonly analysisRecordHandler: McpAnalysisRecordHandler,
    private readonly clientHandler: McpClientHandler,
    private readonly legalPleadingHandler: McpLegalPleadingHandler,
  ) {
    super();
  }

  public override getAvailableTools(): Promise<McpToolModel[]> {
    return Promise.resolve([
      McpToolModel.build({
        name: 'list_analysis_records',
        description: 'List analysis records for the current user',
        parameters: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            type: { type: 'string' },
            search: { type: 'string' },
          },
        },
      }),
      McpToolModel.build({
        name: 'get_cnis_analysis_details',
        description: 'Get analysis record details by ID',
        parameters: {
          type: 'object',
          properties: {
            record_id: {
              type: 'string',
              description: 'The analysis record ID',
            },
          },
          required: ['record_id'],
        },
      }),
      McpToolModel.build({
        name: 'get_cnis_analysis_by_code',
        description: 'Search analysis records by code or name',
        parameters: {
          type: 'object',
          properties: {
            search: { type: 'string', description: 'Search term' },
            page: { type: 'number' },
            limit: { type: 'number' },
          },
          required: ['search'],
        },
      }),
      McpToolModel.build({
        name: 'update_cnis_analysis',
        description:
          'Update a specific field of an analysis result. ' +
          'Most fields (simplifiedAnalysis, firstAnalysis, inssDecisionAnalysis, etc.) accept plain text or Markdown. ' +
          'Some fields store JSON-stringified data and require valid JSON strings: ' +
          'RETIREMENT_PLANNING_RPPS (completeAnalysis, simplifiedAnalysis), ' +
          'RETIREMENT_PLANNING_RGPS (result, compareCnisCtps), ' +
          'RURAL_OR_HYBRID_RETIREMENT_ANALYSIS/REJECTION (all analysis fields), ' +
          'TEACHER_RETIREMENT_PLANNING (completeAnalysis, simplifiedAnalysis), ' +
          'BPC_DISABILITY_DENIAL/BPC_ELDERLY_CESSATION (applicableRules, benefitSummaries), ' +
          'GENERAL_URBAN_RETIREMENT_GRANT/REVIEW (completeAnalysis), ' +
          'SPECIAL_RETIREMENT_GRANT (completeAnalysis), ' +
          'PER_CAPITA_INCOME_FOR_BPC_ANALYSIS (completeAnalysis). ' +
          'Call get_database_schema for the full field reference.',
        parameters: {
          type: 'object',
          properties: {
            record_id: { type: 'string' },
            field_name: {
              type: 'string',
              description: 'Name of the field to update',
            },
            new_content: {
              type: 'string',
              description: 'New content for the field',
            },
          },
          required: ['record_id', 'field_name', 'new_content'],
        },
      }),
      McpToolModel.build({
        name: 'list_legal_pleadings',
        description: 'List legal pleadings',
        parameters: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            search: { type: 'string' },
          },
        },
      }),
      McpToolModel.build({
        name: 'get_legal_pleading_details',
        description: 'Get legal pleading details by ID',
        parameters: {
          type: 'object',
          properties: {
            pleading_id: {
              type: 'string',
              description: 'The legal pleading ID',
            },
          },
          required: ['pleading_id'],
        },
      }),
      McpToolModel.build({
        name: 'get_legal_pleading_by_code',
        description: 'Search legal pleadings by code or name',
        parameters: {
          type: 'object',
          properties: {
            search: { type: 'string' },
            page: { type: 'number' },
            limit: { type: 'number' },
          },
          required: ['search'],
        },
      }),
      McpToolModel.build({
        name: 'update_legal_pleading',
        description: 'Update a specific field of a legal pleading result',
        parameters: {
          type: 'object',
          properties: {
            pleading_id: { type: 'string' },
            field_name: { type: 'string' },
            new_content: { type: 'string' },
          },
          required: ['pleading_id', 'field_name', 'new_content'],
        },
      }),
      McpToolModel.build({
        name: 'list_clients',
        description: 'List clients',
        parameters: {
          type: 'object',
          properties: {
            page: { type: 'number' },
            limit: { type: 'number' },
            search: { type: 'string' },
          },
        },
      }),
      McpToolModel.build({
        name: 'get_client_details',
        description: 'Get client details by ID',
        parameters: {
          type: 'object',
          properties: {
            client_id: { type: 'string', description: 'The client ID' },
          },
          required: ['client_id'],
        },
      }),
      McpToolModel.build({
        name: 'get_retirement_planning_details',
        description:
          'Get retirement planning analysis record details by ID (alias for get_cnis_analysis_details)',
        parameters: {
          type: 'object',
          properties: {
            record_id: {
              type: 'string',
              description: 'The analysis record ID',
            },
          },
          required: ['record_id'],
        },
      }),
      McpToolModel.build({
        name: 'get_retirement_planning_by_code',
        description:
          'Search retirement planning records by code or name (alias for get_cnis_analysis_by_code)',
        parameters: {
          type: 'object',
          properties: {
            search: { type: 'string', description: 'Search term' },
            page: { type: 'number' },
            limit: { type: 'number' },
          },
          required: ['search'],
        },
      }),
      McpToolModel.build({
        name: 'update_retirement_planning',
        description:
          'Update a specific field of a retirement planning analysis result (alias for update_cnis_analysis)',
        parameters: {
          type: 'object',
          properties: {
            record_id: { type: 'string' },
            field_name: {
              type: 'string',
              description: 'Name of the field to update',
            },
            new_content: {
              type: 'string',
              description: 'New content for the field',
            },
          },
          required: ['record_id', 'field_name', 'new_content'],
        },
      }),
      McpToolModel.build({
        name: 'get_accident_assistance_terminated',
        description:
          'Get accident assistance terminated (Auxílio Acidente Cessado) analysis details by accident_assistance_terminated_id. Use this for analyses of type ACCIDENT_ASSISTANCE_TERMINATED or when context says "Auxílio Acidente (Cessado)".',
        parameters: {
          type: 'object',
          properties: {
            accident_assistance_terminated_id: {
              type: 'string',
              description: 'The accident assistance terminated analysis ID (UUID)',
            },
          },
          required: ['accident_assistance_terminated_id'],
        },
      }),
      McpToolModel.build({
        name: 'get_accident_benefit_rejection',
        description:
          'Get accident benefit rejection analysis details by accident_benefit_rejection_id. Use this for analyses of type ACCIDENT_BENEFIT_REJECTION.',
        parameters: {
          type: 'object',
          properties: {
            accident_benefit_rejection_id: {
              type: 'string',
              description: 'The accident benefit rejection analysis ID',
            },
          },
          required: ['accident_benefit_rejection_id'],
        },
      }),
      McpToolModel.build({
        name: 'update_accident_benefit_rejection_result',
        description:
          'Update a specific field of an accident benefit rejection analysis result. Fields: firstAnalysis, secondAnalysis, completeAnalysis, simplifiedAnalysis, completeAnalysisDownload.',
        parameters: {
          type: 'object',
          properties: {
            accident_benefit_rejection_id: {
              type: 'string',
              description: 'The accident benefit rejection analysis ID',
            },
            field_name: {
              type: 'string',
              description: 'Name of the field to update',
            },
            new_content: {
              type: 'string',
              description: 'New content for the field',
            },
          },
          required: [
            'accident_benefit_rejection_id',
            'field_name',
            'new_content',
          ],
        },
      }),
      McpToolModel.build({
        name: 'get_retirement_permanent_disability_revision',
        description:
          'Get retirement permanent disability revision analysis details by retirement_permanent_disability_revision_id. Use this for analyses of type RETIREMENT_PERMANENT_DISABILITY_REVISION.',
        parameters: {
          type: 'object',
          properties: {
            retirement_permanent_disability_revision_id: {
              type: 'string',
              description:
                'The retirement permanent disability revision analysis ID',
            },
          },
          required: ['retirement_permanent_disability_revision_id'],
        },
      }),
      McpToolModel.build({
        name: 'update_retirement_permanent_disability_revision_result',
        description:
          'Update a specific field of a retirement permanent disability revision result. Fields: retirementPermanentDisabilityRevisionFirstAnalysis, retirementPermanentDisabilityRevisionCompleteAnalysis, retirementPermanentDisabilityRevisionCompleteAnalysisDownload, retirementPermanentDisabilityRevisionSimplifiedAnalysis.',
        parameters: {
          type: 'object',
          properties: {
            retirement_permanent_disability_revision_id: {
              type: 'string',
              description:
                'The retirement permanent disability revision analysis ID',
            },
            field_name: {
              type: 'string',
              description: 'Name of the field to update',
            },
            new_content: {
              type: 'string',
              description: 'New content for the field',
            },
          },
          required: [
            'retirement_permanent_disability_revision_id',
            'field_name',
            'new_content',
          ],
        },
      }),
      McpToolModel.build({
        name: 'get_teacher_retirement_planning_rpps',
        description:
          'Get teacher retirement planning RPPS analysis details by teacher_retirement_planning_rpps_id. ' +
          'Use this for analyses of type TEACHER_RETIREMENT_PLANNING_RPPS. ' +
          'Fields teacherRetirementPlanningCompleteAnalysis and teacherRetirementPlanningSimplifiedAnalysis store JSON-stringified data.',
        parameters: {
          type: 'object',
          properties: {
            teacher_retirement_planning_rpps_id: {
              type: 'string',
              description: 'The teacher retirement planning RPPS analysis ID',
            },
          },
          required: ['teacher_retirement_planning_rpps_id'],
        },
      }),
      McpToolModel.build({
        name: 'update_teacher_retirement_planning_rpps_result',
        description:
          'Update a specific field of a teacher retirement planning RPPS result. ' +
          'Plain-text fields: teacherRetirementPlanningCompleteAnalysisDownload. ' +
          'JSON-stringified fields (must provide valid JSON): teacherRetirementPlanningCompleteAnalysis, teacherRetirementPlanningSimplifiedAnalysis.',
        parameters: {
          type: 'object',
          properties: {
            teacher_retirement_planning_rpps_id: {
              type: 'string',
              description: 'The teacher retirement planning RPPS analysis ID',
            },
            field_name: {
              type: 'string',
              description: 'Name of the field to update',
            },
            new_content: {
              type: 'string',
              description: 'New content for the field',
            },
          },
          required: [
            'teacher_retirement_planning_rpps_id',
            'field_name',
            'new_content',
          ],
        },
      }),
      McpToolModel.build({
        name: 'update_accident_assistance_terminated_result',
        description:
          'Update a specific field of an accident assistance terminated (Auxílio Acidente Cessado) analysis result. Fields: accidentAssistanceTerminatedCompleteAnalysis (JSON-stringified), accidentAssistanceTerminatedSimplifiedAnalysis, decisionDetails, firstAnalysis, completeAnalysisDownload.',
        parameters: {
          type: 'object',
          properties: {
            accident_assistance_terminated_id: {
              type: 'string',
              description: 'The accident assistance terminated analysis ID (UUID)',
            },
            field_name: {
              type: 'string',
              description: 'Name of the field to update',
            },
            new_content: {
              type: 'string',
              description: 'New content for the field',
            },
          },
          required: [
            'accident_assistance_terminated_id',
            'field_name',
            'new_content',
          ],
        },
      }),
      McpToolModel.build({
        name: 'get_analysis_by_entity_id',
        description:
          'Get any guided analysis record by its entity UUID and analysis type. Use this when you have an entity UUID from context (e.g. "UUID: abc-123") along with the analysis type. Returns the full analysis record with all relations. For ACCIDENT_ASSISTANCE_TERMINATED type, prefer get_accident_assistance_terminated instead.',
        parameters: {
          type: 'object',
          properties: {
            entity_id: {
              type: 'string',
              description: 'The entity UUID from the analysis context',
            },
            analysis_type: {
              type: 'string',
              description:
                'The analysis type enum value (e.g. "auxilio_acidente_cessado", "planejamento_previdenciario_rgps", "cessacao_auxilio_incapacidade_temporaria", etc.)',
            },
          },
          required: ['entity_id', 'analysis_type'],
        },
      }),
      McpToolModel.build({
        name: 'update_analysis_result_by_entity_id',
        description:
          'Update a field of ANY guided analysis result using the entity UUID and analysis type from context. Use this when you need to update an analysis and have the entity UUID (not the AnalysisToolRecord ID). Finds the record first, then updates.',
        parameters: {
          type: 'object',
          properties: {
            entity_id: {
              type: 'string',
              description: 'The entity UUID from the analysis context',
            },
            analysis_type: {
              type: 'string',
              description:
                'The analysis type enum value (e.g. "auxilio_acidente_cessado", "planejamento_previdenciario_rgps", etc.)',
            },
            field_name: {
              type: 'string',
              description: 'Name of the field to update',
            },
            new_content: {
              type: 'string',
              description: 'New content for the field',
            },
          },
          required: ['entity_id', 'analysis_type', 'field_name', 'new_content'],
        },
      }),
      McpToolModel.build({
        name: 'get_special_category_retirement_analysis',
        description:
          'Get a special category retirement analysis (Aposentadoria Especial por Categoria) by its entity UUID. Returns analysis metadata and result fields.',
        parameters: {
          type: 'object',
          properties: {
            entity_id: {
              type: 'string',
              description: 'The SpecialCategoryRetirementAnalysis entity UUID',
            },
          },
          required: ['entity_id'],
        },
      }),
      McpToolModel.build({
        name: 'update_analysis_record_status',
        description:
          'Update the status of an analysis record (AnalysisToolRecord). Valid statuses: in_progress, completed.',
        parameters: {
          type: 'object',
          properties: {
            record_id: {
              type: 'string',
              description: 'The AnalysisToolRecord UUID',
            },
            status: {
              type: 'string',
              description: 'New status: in_progress or completed',
            },
          },
          required: ['record_id', 'status'],
        },
      }),
      McpToolModel.build({
        name: 'update_client_details',
        description:
          'Update fields of an analysis tool client (pessoa física/jurídica). Updatable fields: name, email, phone_number, birth_date (ISO date string), gender (MALE/FEMALE/OTHER), inss_password, client_type.',
        parameters: {
          type: 'object',
          properties: {
            client_id: {
              type: 'string',
              description: 'The AnalysisToolClient UUID',
            },
            name: { type: 'string', description: 'Full name' },
            email: { type: 'string', description: 'Email address' },
            phone_number: { type: 'string', description: 'Phone number (digits only or formatted)' },
            birth_date: {
              type: 'string',
              description: 'Birth date in ISO format (YYYY-MM-DD)',
            },
            gender: { type: 'string', description: 'Gender: MALE, FEMALE, or OTHER' },
            inss_password: { type: 'string', description: 'INSS portal password' },
            client_type: { type: 'string', description: 'Client type enum value' },
          },
          required: ['client_id'],
        },
      }),
    ]);
  }

  public override async executeToolCall(
    toolName: string,
    parameters: Record<string, unknown>,
  ): Promise<unknown> {
    const toolMap: Record<
      string,
      (params: Record<string, unknown>) => Promise<unknown>
    > = {
      list_analysis_records: (p) =>
        this.analysisRecordHandler.listAnalysisRecords(
          p,
          'list_analysis_records',
        ),
      get_cnis_analysis_details: (p) =>
        this.analysisRecordHandler.getAnalysisRecordById(
          p,
          'get_cnis_analysis_details',
        ),
      get_cnis_analysis_by_code: (p) =>
        this.analysisRecordHandler.getAnalysisRecordByCode(
          p,
          'get_cnis_analysis_by_code',
        ),
      update_cnis_analysis: (p) =>
        this.analysisRecordHandler.updateAnalysisResult(
          p,
          'update_cnis_analysis',
        ),
      list_legal_pleadings: (p) =>
        this.legalPleadingHandler.listLegalPleadings(p, 'list_legal_pleadings'),
      get_legal_pleading_details: (p) =>
        this.legalPleadingHandler.getLegalPleadingById(
          p,
          'get_legal_pleading_details',
        ),
      get_legal_pleading_by_code: (p) =>
        this.legalPleadingHandler.getLegalPleadingByCode(
          p,
          'get_legal_pleading_by_code',
        ),
      update_legal_pleading: (p) =>
        this.legalPleadingHandler.updateLegalPleading(
          p,
          'update_legal_pleading',
        ),
      list_clients: (p) => this.clientHandler.listClients(p, 'list_clients'),
      get_client_details: (p) =>
        this.clientHandler.getClientById(p, 'get_client_details'),
      get_retirement_planning_details: (p) =>
        this.analysisRecordHandler.getAnalysisRecordById(
          p,
          'get_retirement_planning_details',
        ),
      get_retirement_planning_by_code: (p) =>
        this.analysisRecordHandler.getAnalysisRecordByCode(
          p,
          'get_retirement_planning_by_code',
        ),
      update_retirement_planning: (p) =>
        this.analysisRecordHandler.updateAnalysisResult(
          p,
          'update_retirement_planning',
        ),
      get_accident_assistance_terminated: (p) =>
        this.analysisRecordHandler.getAccidentAssistanceTerminated(
          p,
          'get_accident_assistance_terminated',
        ),
      get_accident_benefit_rejection: (p) =>
        this.analysisRecordHandler.getAccidentBenefitRejection(
          p,
          'get_accident_benefit_rejection',
        ),
      update_accident_benefit_rejection_result: (p) =>
        this.analysisRecordHandler.updateAccidentBenefitRejectionResult(
          p,
          'update_accident_benefit_rejection_result',
        ),
      get_retirement_permanent_disability_revision: (p) =>
        this.analysisRecordHandler.getRetirementPermanentDisabilityRevision(
          p,
          'get_retirement_permanent_disability_revision',
        ),
      update_retirement_permanent_disability_revision_result: (p) =>
        this.analysisRecordHandler.updateRetirementPermanentDisabilityRevisionResult(
          p,
          'update_retirement_permanent_disability_revision_result',
        ),
      get_teacher_retirement_planning_rpps: (p) =>
        this.analysisRecordHandler.getTeacherRetirementPlanningRpps(
          p,
          'get_teacher_retirement_planning_rpps',
        ),
      update_teacher_retirement_planning_rpps_result: (p) =>
        this.analysisRecordHandler.updateTeacherRetirementPlanningRppsResult(
          p,
          'update_teacher_retirement_planning_rpps_result',
        ),
      update_accident_assistance_terminated_result: (p) =>
        this.analysisRecordHandler.updateAccidentAssistanceTerminatedResult(
          p,
          'update_accident_assistance_terminated_result',
        ),
      get_analysis_by_entity_id: (p) =>
        this.analysisRecordHandler.getAnalysisByEntityId(
          p,
          'get_analysis_by_entity_id',
        ),
      update_analysis_result_by_entity_id: (p) =>
        this.analysisRecordHandler.updateAnalysisResultByEntityId(
          p,
          'update_analysis_result_by_entity_id',
        ),
      get_special_category_retirement_analysis: (p) =>
        this.analysisRecordHandler.getSpecialCategoryRetirementAnalysis(
          p,
          'get_special_category_retirement_analysis',
        ),
      update_analysis_record_status: (p) =>
        this.analysisRecordHandler.updateAnalysisRecordStatus(
          p,
          'update_analysis_record_status',
        ),
      update_client_details: (p) =>
        this.clientHandler.updateClientDetails(p, 'update_client_details'),
    };

    const handler = toolMap[toolName];
    if (!handler) {
      throw new McpExecuteToolCallError({
        toolName,
        message: `Unknown tool: ${toolName}`,
      });
    }
    return handler(parameters);
  }

  public override executeQuery(_query: string): Promise<McpQueryResultModel> {
    throw new McpExecuteToolCallError({
      toolName: 'execute_query',
      message: 'Direct SQL queries are not supported in internal mode',
    });
  }

  public override validateQuery(_query: string): Promise<boolean> {
    return Promise.resolve(false);
  }

  public override getDatabaseSchema(): Promise<string> {
    return Promise.resolve(`
# Analysis Tool - Field Reference

## General rules
- Use list_analysis_records to find records, then get_cnis_analysis_details with the record_id to read all fields.
- Use update_cnis_analysis (or dedicated tools below) to update a specific field.
- For analyses where you have entity_id + analysis_type from context, use get_analysis_by_entity_id to read and update_analysis_result_by_entity_id to write. For ACCIDENT_ASSISTANCE_TERMINATED specifically, also has get_accident_assistance_terminated and update_accident_assistance_terminated_result.
- For SPECIAL_CATEGORY_RETIREMENT, use get_special_category_retirement_analysis with the entity_id; update its result via update_cnis_analysis with the AnalysisToolRecord ID.
- Use update_analysis_record_status to change a record status (in_progress / completed).
- Use update_client_details to update client fields (name, email, phone_number, birth_date, gender, inss_password, client_type).
- All 48 analysis types are supported via get_analysis_by_entity_id / update_analysis_result_by_entity_id.

## ⚠️ JSON-stringified fields (must provide valid JSON string when updating)
These fields store JSON-serialized objects/arrays as plain strings.
When reading you'll receive the raw JSON string; when updating you MUST provide valid JSON:

| Analysis type | Field(s) that are JSON strings |
|---|---|
| RETIREMENT_PLANNING_RPPS | retirementPlanningRppsCompleteAnalysis, retirementPlanningRppsSimplifiedAnalysis |
| RETIREMENT_PLANNING_RGPS | result (retirementPlanningRgpsResult), compareCnisCtps, compareCnisCtpsRaw |
| RURAL_OR_HYBRID_RETIREMENT_ANALYSIS | firstAnalysis, secondAnalysis, completeAnalysis, simplifiedAnalysis, completeAnalysisDownload, simplifiedAnalysisDownload |
| RURAL_OR_HYBRID_RETIREMENT_REJECTION | completeAnalysis, firstAnalysis |
| TEACHER_RETIREMENT_PLANNING | teacherRetirementPlanningCompleteAnalysis, teacherRetirementPlanningSimplifiedAnalysis |
| BPC_DISABILITY_DENIAL | applicableRules (JSON array), benefitSummaries (JSON array) |
| BPC_ELDERLY_CESSATION | applicableRules (JSON array), benefitSummaries (JSON array) |
| GENERAL_URBAN_RETIREMENT_GRANT | generalUrbanRetirementGrantCompleteAnalysis, compareCnisCtps, compareCnisCtpsRaw |
| GENERAL_URBAN_RETIREMENT_REVIEW | generalUrbanRetirementReviewCompleteAnalysis, compareCnisCtps, compareCnisCtpsRaw |
| SPECIAL_RETIREMENT_GRANT | specialRetirementGrantCompleteAnalysis |
| PER_CAPITA_INCOME_FOR_BPC_ANALYSIS | completeAnalysis |
| DISABILITY_RETIREMENT_PLANNING | disabilityRetirementPlanningCompleteAnalysis |

## ✅ Plain text / Markdown fields (safe to update with readable text)
All other fields (simplifiedAnalysis, firstAnalysis, secondAnalysis, inssDecisionAnalysis,
completeAnalysisDownload for most types, etc.) store plain text or Markdown.

## Organisation isolation
All queries are automatically scoped to the authenticated user's organisation.
The AI cannot access data from other organisations.
    `);
  }

  public override getDatabaseStats(): Promise<McpDatabaseStatsModel> {
    return Promise.resolve(
      McpDatabaseStatsModel.build({ tables: [], timestamp: Date.now() }),
    );
  }

  public override healthCheck(): Promise<boolean> {
    return Promise.resolve(true);
  }
}
