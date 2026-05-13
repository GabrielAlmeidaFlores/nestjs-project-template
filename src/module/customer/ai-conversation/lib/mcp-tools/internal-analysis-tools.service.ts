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
        description: 'Update a specific field of an analysis result',
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
    return Promise.resolve(
      'Internal database schema - use available tools to query data',
    );
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
