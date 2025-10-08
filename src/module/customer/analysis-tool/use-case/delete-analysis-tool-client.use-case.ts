import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolClientCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/command/analysis-tool-client.command.repository.gateway';
import { AnalysisToolClientQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-client/query/analysis-tool-client.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import { DeleteAnalysisToolClientResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-client.response';
import { AnalysisToolClientNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-client-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteAnalysisToolClientUseCase {
  protected readonly _type = DeleteAnalysisToolClientUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolClientQueryRepositoryGateway)
    private readonly analysisToolClientQueryRepositoryGateway: AnalysisToolClientQueryRepositoryGateway,
    @Inject(AnalysisToolClientCommandRepositoryGateway)
    private readonly analysisToolClientCommandRepositoryGateway: AnalysisToolClientCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisToolClientId: AnalysisToolClientId,
  ): Promise<DeleteAnalysisToolClientResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolClientResult =
      await this.analysisToolClientQueryRepositoryGateway.findOneByAnalysisToolClientAndOrganizationIdOrFail(
        analysisToolClientId,
        organizationSessionData.organizationId,
        AnalysisToolClientNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...analysisToolClientResult,
      createdBy: analysisToolClientResult.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const updateTransaction =
      this.analysisToolClientCommandRepositoryGateway.updateAnalysisToolClient(
        analysisToolClientResult.id,
        analysisToolClient,
      );

    const deleteTransaction =
      this.analysisToolClientCommandRepositoryGateway.deleteAnalysisToolClient(
        analysisToolClientResult.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
      deleteTransaction,
    ]);

    await transaction.commit();

    return DeleteAnalysisToolClientResponseDto.build({
      analysisToolClientId: analysisToolClientResult.id,
    });
  }
}
