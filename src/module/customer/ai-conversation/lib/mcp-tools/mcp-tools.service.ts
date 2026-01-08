import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { McpExecuteQueryError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-execute-query.error';
import { McpExecuteToolCallError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-execute-tool-call.error';
import { McpGetAvailableToolsError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-get-available-tools.error';
import { McpGetDatabaseSchemaError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-get-database-schema.error';
import { McpGetDatabaseStatsError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-get-database-stats.error';
import { McpToolsGateway } from '@module/customer/ai-conversation/lib/mcp-tools/mcp-tools.gateway';
import { McpApiResponseModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-api-response.model';
import { McpDatabaseStatsModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-database-stats.model';
import { McpQueryResultModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-query-result.model';
import { McpToolModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-tool.model';
import { McpApplicationVariable } from '@shared/system/constant/application-variable/source/mcp.application-variable';

@Injectable()
export class McpToolsService implements McpToolsGateway {
  protected readonly _type = McpToolsService.name;

  private readonly mcpBaseUrl: string;

  public constructor(private readonly httpService: HttpService) {
    this.mcpBaseUrl = McpApplicationVariable.MCP_SERVER_URL;
  }

  public async executeQuery(query: string): Promise<McpQueryResultModel> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<McpApiResponseModel<McpQueryResultModel>>(
          `${this.mcpBaseUrl}/tools/query/execute`,
          { query },
        ),
      );

      if (response.data.success === false || response.data.data === undefined) {
        throw new Error(response.data.error ?? 'Erro ao executar query');
      }

      return McpQueryResultModel.build(response.data.data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao executar query';
      throw new McpExecuteQueryError({ message: errorMessage });
    }
  }

  public async validateQuery(query: string): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<McpApiResponseModel<{ isValid: boolean }>>(
          `${this.mcpBaseUrl}/tools/query/validate`,
          { query },
        ),
      );

      return response.data.data?.isValid ?? false;
    } catch {
      return false;
    }
  }

  public async getDatabaseSchema(): Promise<string> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<McpApiResponseModel<{ schema: string }>>(
          `${this.mcpBaseUrl}/tools/schema`,
        ),
      );

      if (response.data.success === false || response.data.data === undefined) {
        throw new Error('Erro ao buscar schema');
      }

      return response.data.data.schema;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao buscar schema';
      throw new McpGetDatabaseSchemaError({ message: errorMessage });
    }
  }

  public async getDatabaseStats(): Promise<McpDatabaseStatsModel> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<McpApiResponseModel<McpDatabaseStatsModel>>(
          `${this.mcpBaseUrl}/tools/stats`,
        ),
      );

      if (response.data.success === false || response.data.data === undefined) {
        throw new Error('Erro ao buscar estatísticas');
      }

      return McpDatabaseStatsModel.build(response.data.data);
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao buscar estatísticas';
      throw new McpGetDatabaseStatsError({ message: errorMessage });
    }
  }

  public async healthCheck(): Promise<boolean> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<{ status: string }>(`${this.mcpBaseUrl}/health`),
      );

      return response.data.status === 'healthy';
    } catch {
      return false;
    }
  }

  public async getAvailableTools(): Promise<McpToolModel[]> {
    try {
      const response = await firstValueFrom(
        this.httpService.get<
          McpApiResponseModel<{
            tools: Array<{
              name: string;
              description: string;
              parameters: Record<string, unknown>;
            }>;
          }>
        >(`${this.mcpBaseUrl}/tools`),
      );

      if (response.data.success === false || response.data.data === undefined) {
        throw new Error('Erro ao buscar ferramentas');
      }

      return response.data.data.tools.map((tool) => McpToolModel.build(tool));
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao buscar ferramentas';
      throw new McpGetAvailableToolsError({ message: errorMessage });
    }
  }

  public async executeToolCall(
    toolName: string,
    parameters: Record<string, unknown>,
  ): Promise<unknown> {
    try {
      const response = await firstValueFrom(
        this.httpService.post<McpApiResponseModel<unknown>>(
          `${this.mcpBaseUrl}/tools/${toolName}/execute`,
          parameters,
        ),
      );

      if (response.data.success === false) {
        throw new Error(
          response.data.error ?? `Erro ao executar ferramenta ${toolName}`,
        );
      }

      return response.data.data;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao executar ferramenta';
      throw new McpExecuteToolCallError({ toolName, message: errorMessage });
    }
  }
}
