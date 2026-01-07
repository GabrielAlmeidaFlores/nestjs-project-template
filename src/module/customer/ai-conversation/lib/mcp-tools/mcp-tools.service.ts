import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';

import { McpApiResponseModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-api-response.model';
import { McpDatabaseStatsModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-database-stats.model';
import { McpQueryResultModel } from '@module/customer/ai-conversation/lib/mcp-tools/model/generic/mcp-query-result.model';

@Injectable()
export class McpToolsService {
  protected readonly _type = McpToolsService.name;

  private readonly mcpBaseUrl: string;

  public constructor(private readonly httpService: HttpService) {
    this.mcpBaseUrl = process.env['MCP_SERVER_URL'] ?? 'http://localhost:3001';
  }

  /**
   * Executa uma query SQL via MCP Server
   */
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
      throw new Error(`Erro ao executar query no MCP: ${errorMessage}`);
    }
  }

  /**
   * Valida uma query SQL sem executá-la
   */
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

  /**
   * Obtém o schema do banco de dados
   */
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
      throw new Error(`Erro ao buscar schema no MCP: ${errorMessage}`);
    }
  }

  /**
   * Obtém estatísticas do banco de dados
   */
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
      throw new Error(`Erro ao buscar estatísticas no MCP: ${errorMessage}`);
    }
  }

  /**
   * Testa conexão com o MCP Server
   */
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

  /**
   * Obtém a lista de ferramentas (tools) disponíveis no MCP Server
   */
  public async getAvailableTools(): Promise<
    Array<{
      name: string;
      description: string;
      parameters: Record<string, unknown>;
    }>
  > {
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

      return response.data.data.tools;
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Erro desconhecido ao buscar ferramentas';
      throw new Error(`Erro ao buscar ferramentas no MCP: ${errorMessage}`);
    }
  }

  /**
   * Executa uma chamada de função (tool call) no MCP Server
   */
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
      throw new Error(
        `Erro ao executar ferramenta ${toolName} no MCP: ${errorMessage}`,
      );
    }
  }
}
