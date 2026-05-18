import { Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationId } from '@module/customer/account/domain/schema/entity/organization/value-object/organization-id/organization-id.value-object';
import { McpExecuteToolCallError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-execute-tool-call.error';
import { McpRecordNotFoundError } from '@module/customer/ai-conversation/lib/mcp-tools/error/mcp-record-not-found.error';
import { LegalPleadingQueryRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/legal-pleading.query.repository.gateway';
import { ListLegalPleadingQueryParam } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading/query/param/list-legal-pleading.query.param';
import { LegalPleadingResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/legal-pleading/domain/repository/legal-pleading-result/command/legal-pleading-result.repository.gateway';
import { LegalPleadingId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading/value-object/legal-pleading-id/legal-pleading-id.value-object';
import { LegalPleadingResultEntity } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-result/legal-pleading-result.entity';
import { LegalPleadingResultId } from '@module/customer/analysis-tool/module/legal-pleading/domain/schema/entity/legal-pleading-result/value-object/legal-pleading-result-id/legal-pleading-result-id.value-object';
import { AuthIdentityId } from '@module/generic/auth-identity/domain/schema/entity/auth-identity/value-object/auth-identity-id/auth-identity-id.value-object';

@Injectable()
export class McpLegalPleadingHandler {
  protected readonly _type = McpLegalPleadingHandler.name;

  public constructor(
    private readonly transactionRepo: BaseTransactionRepositoryGateway,
    private readonly legalPleadingQueryRepo: LegalPleadingQueryRepositoryGateway,
    private readonly legalPleadingResultCommandRepo: LegalPleadingResultCommandRepositoryGateway,
  ) {}

  public async listLegalPleadings(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const page = params['page'] as number | undefined;
    const limit = params['limit'] as number | undefined;
    const search = params['search'] as string | undefined;

    const queryParam = new ListLegalPleadingQueryParam({
      ...(page !== undefined ? { page } : {}),
      ...(limit !== undefined ? { limit } : {}),
      searchBy: search ?? null,
      status: null,
    });

    const result =
      await this.legalPleadingQueryRepo.listByOrganizationIdAndAuthIdentityId(
        orgId,
        authId,
        queryParam,
      );

    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      page: result.page,
      items: result.resource.map((p) => ({
        id: p.id.toString(),
        code: p.code.toString(),
        status: p.status,
        petitionType: p.petitionType,
        benefitType: p.benefitType,
        securitySystem: p.securitySystem,
        statementOfFacts: p.statementOfFacts,
        additionalComments: p.additionalComments,
        createdAt: p.createdAt,
      })),
    };
  }

  public async getLegalPleadingById(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const pleadingId = new LegalPleadingId(params['pleading_id'] as string);

    const pleading =
      await this.legalPleadingQueryRepo.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        pleadingId,
        orgId,
        authId,
        McpRecordNotFoundError,
      );

    return {
      id: pleading.id.toString(),
      code: pleading.code.toString(),
      status: pleading.status,
      petitionType: pleading.petitionType,
      benefitType: pleading.benefitType,
      securitySystem: pleading.securitySystem,
      statementOfFacts: pleading.statementOfFacts,
      additionalComments: pleading.additionalComments,
      result: pleading.legalPleadingResult
        ? {
            id: pleading.legalPleadingResult.id.toString(),
            legalPleadingCompleteAnalysis:
              pleading.legalPleadingResult.legalPleadingCompleteAnalysis,
            legalPleadingSimplifiedAnalysis:
              pleading.legalPleadingResult.legalPleadingSimplifiedAnalysis,
          }
        : null,
      createdAt: pleading.createdAt,
    };
  }

  public async getLegalPleadingByCode(
    params: Record<string, unknown>,
    _toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const search = params['search'] as string;
    const page = params['page'] as number | undefined;
    const limit = params['limit'] as number | undefined;

    const queryParam = new ListLegalPleadingQueryParam({
      ...(page !== undefined ? { page } : {}),
      ...(limit !== undefined ? { limit } : {}),
      searchBy: search,
      status: null,
    });

    const result =
      await this.legalPleadingQueryRepo.listByOrganizationIdAndAuthIdentityId(
        orgId,
        authId,
        queryParam,
      );

    return {
      totalItems: result.totalItems,
      totalPages: result.totalPages,
      page: result.page,
      items: result.resource.map((p) => ({
        id: p.id.toString(),
        code: p.code.toString(),
        status: p.status,
        petitionType: p.petitionType,
        benefitType: p.benefitType,
        securitySystem: p.securitySystem,
        statementOfFacts: p.statementOfFacts,
        additionalComments: p.additionalComments,
        createdAt: p.createdAt,
      })),
    };
  }

  public async updateLegalPleading(
    params: Record<string, unknown>,
    toolName: string,
  ): Promise<unknown> {
    const { orgId, authId } = this.getOrgContext(params);
    const pleadingId = new LegalPleadingId(params['pleading_id'] as string);
    const fieldName = params['field_name'] as string;
    const newContent = params['new_content'] as string;

    const pleading =
      await this.legalPleadingQueryRepo.findOneByLegalPleadingIdAndOrganizationIdAndAuthIdentityIdOrFail(
        pleadingId,
        orgId,
        authId,
        McpRecordNotFoundError,
      );

    const existingResult = pleading.legalPleadingResult;

    if (!existingResult) {
      throw new McpExecuteToolCallError({
        toolName,
        message: 'No result found for this legal pleading',
      });
    }

    const resultId = new LegalPleadingResultId(existingResult.id.toString());
    const updatedProps: Record<string, unknown> = {
      id: resultId,
      legalPleadingCompleteAnalysis:
        existingResult.legalPleadingCompleteAnalysis,
      legalPleadingSimplifiedAnalysis:
        existingResult.legalPleadingSimplifiedAnalysis,
    };
    updatedProps[fieldName] = newContent;

    const updatedEntity = new LegalPleadingResultEntity(
      updatedProps as unknown as ConstructorParameters<
        typeof LegalPleadingResultEntity
      >[0],
    );
    await this.transactionRepo.execute(
      this.legalPleadingResultCommandRepo.updateLegalPleadingResult(
        resultId,
        updatedEntity,
      ),
    );

    return {
      success: true,
      message: `Field '${fieldName}' updated successfully`,
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
