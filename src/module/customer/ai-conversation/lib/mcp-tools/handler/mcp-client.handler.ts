import { Injectable } from '@nestjs/common';

import { ListDataInputModel } from '@core/domain/repository/base/query/model/input/list-data.input.model';
import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { GenderEnum } from '@core/domain/schema/enum/gender.enum';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { McpExecuteToolCallError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-execute-tool-call.error';
import { McpRecordNotFoundError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-record-not-found.error';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientTypeEnum } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/enum/analysis-tool-client-type.enum';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class McpClientHandler {
  protected readonly _type = McpClientHandler.name;

  public constructor(
    private readonly analysisToolClientQueryRepo: AnalysisToolClientQueryRepositoryGateway,
    private readonly analysisToolClientCommandRepo: AnalysisToolClientCommandRepositoryGateway,
    private readonly transactionRepo: BaseTransactionRepositoryGateway,
    private readonly organizationMemberQueryRepo: OrganizationMemberQueryRepositoryGateway,
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

  public async updateClientDetails(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const clientId = new AnalysisToolClientId(params['client_id'] as string);
    if (
      params['client_id'] === null ||
      params['client_id'] === undefined ||
      params['client_id'] === ''
    ) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'client_id is required',
      });
    }

    const client =
      await this.analysisToolClientQueryRepo.findOneByAnalysisToolClientIdAndOrganizationIdOrFail(
        clientId,
        orgId,
        McpRecordNotFoundError,
      );

    const orgMember =
      await this.organizationMemberQueryRepo.findOneByCustomerIdAndAuthIdentityId(
        authId,
        orgId,
      );
    if (!orgMember) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'Organization member not found',
      });
    }

    const rawEmail = params['email'] as string | undefined;
    const rawPhone = params['phone_number'] as string | undefined;

    const updatedEntity = new AnalysisToolClientEntity({
      id: client.id,
      name: (params['name'] as string | undefined) ?? client.name,
      gender: (params['gender'] as GenderEnum | undefined) ?? client.gender,
      birthDate:
        params['birth_date'] !== null && params['birth_date'] !== undefined
          ? new Date(params['birth_date'] as string)
          : client.birthDate,
      federalDocument: client.federalDocument,
      email:
        rawEmail !== undefined && rawEmail !== ''
          ? new Email(rawEmail)
          : client.email,
      corporateEmail: client.corporateEmail,
      inssPassword:
        (params['inss_password'] as string | undefined) ?? client.inssPassword,
      phoneNumber:
        rawPhone !== undefined && rawPhone !== ''
          ? new PhoneNumber(rawPhone)
          : client.phoneNumber,
      clientType:
        (params['client_type'] as AnalysisToolClientTypeEnum | undefined) ??
        client.clientType,
      createdAt: client.createdAt,
      createdBy: client.createdBy.id,
      updatedBy: orgMember.id,
    });

    const tx = this.transactionRepo.execute([
      this.analysisToolClientCommandRepo.updateAnalysisToolClient(
        updatedEntity.id,
        updatedEntity,
      ),
    ]);
    const result = await tx;
    await result.commit();

    return { success: true, client_id: clientId.toString() };
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
