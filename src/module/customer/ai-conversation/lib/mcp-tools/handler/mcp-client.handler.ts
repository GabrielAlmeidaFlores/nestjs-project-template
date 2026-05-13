import { Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { McpRecordNotFoundError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-record-not-found.error';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class McpClientHandler {
  protected readonly _type = McpClientHandler.name;

  public constructor(
    private readonly analysisToolClientQueryRepo: AnalysisToolClientQueryRepositoryGateway,
  ) {}

  public async listClients(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId } = this.getOrgContext(params);
    const page = params['page'] as number | undefined;
    const limit = params['limit'] as number | undefined;
    const search = params['search'] as string | undefined;

    const listData = new ListDataInputModel({
      ...(page !== undefined ? { page } : {}),
      ...(limit !== undefined ? { limit } : {}),
      search: search ?? null,
    });
    const result = await this.analysisToolClientQueryRepo.listByOrganizationId(
      orgId,
      listData,
    );

    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      page: result.page,
      items: result.resource.map((c) => ({
        id: c.id.toString(),
        name: c.name,
        federalDocument: c.federalDocument?.toString() ?? null,
        email: c.email?.toString() ?? null,
        birthDate: c.birthDate,
        clientType: c.clientType,
      })),
    };
  }

  public async getClientById(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId } = this.getOrgContext(params);
    const clientId = new AnalysisToolClientId(params['client_id'] as string);

    const client =
      await this.analysisToolClientQueryRepo.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        clientId,
        orgId,
        McpRecordNotFoundError,
      );

    return {
      id: client.id.toString(),
      name: client.name,
      federalDocument: client.federalDocument?.toString() ?? null,
      email: client.email?.toString() ?? null,
      corporateEmail: client.corporateEmail?.toString() ?? null,
      birthDate: client.birthDate,
      gender: client.gender,
      clientType: client.clientType,
      phoneNumber: client.phoneNumber?.toString() ?? null,
    };
  }

  private getOrgContext(params: Record<string, unknown>): {
    orgId: OrganizationId;
    authId: AuthIdentityId;
  } {
    const orgId = new OrganizationId(params['organization_id'] as string);
    const authId = new AuthIdentityId(params['auth_identity_id'] as string);
    return { orgId, authId };
  }
}
