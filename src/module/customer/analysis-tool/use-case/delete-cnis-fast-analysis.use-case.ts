import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { CnisFastAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/command/cnis-fast-analysis.command.repository.gateway';
import { CnisFastAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/cnis-fast-analysis/query/cnis-fast-analysis.query.repository.gateway';
import { AnalysisToolClientEntity } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/analysis-tool-client.entity';
import { CnisFastAnalysisEntity } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/cnis-fast-analysis.entity';
import { CnisFastAnalysisId } from '@module/customer/analysis-tool/domain/schema/entity/cnis-fast-analysis/value-object/cnis-fast-analysis-id/cnis-fast-analysis-id.value-object';
import { DeleteCnisFastAnalysisResponseDto } from '@module/customer/analysis-tool/dto/response/delete-cnis-fast-analysis.response';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export default class DeleteCnisFastAnalysisUseCase {
  protected readonly _type = DeleteCnisFastAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(CnisFastAnalysisQueryRepositoryGateway)
    private readonly cnisFastAnalysisQueryRepositoryGateway: CnisFastAnalysisQueryRepositoryGateway,
    @Inject(CnisFastAnalysisCommandRepositoryGateway)
    private readonly cnisFastAnalysisCommandRepositoryGateway: CnisFastAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    cnisFastAnalysisId: CnisFastAnalysisId,
  ): Promise<DeleteCnisFastAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const cnisFastAnalysisResult =
      await this.cnisFastAnalysisQueryRepositoryGateway.findOneByCnisFastAnalysisAndOrganizationIdOrFail(
        cnisFastAnalysisId,
        organizationSessionData.organizationId,
        OrganizationMemberNotFoundError,
      );

    const analysisToolClient = new AnalysisToolClientEntity({
      ...cnisFastAnalysisResult.analysisToolClient,
      id: cnisFastAnalysisResult.analysisToolClient.id,
      createdBy: cnisFastAnalysisResult.analysisToolClient.createdBy.id,
      updatedBy: organizationMember.id,
    });

    const cnisFastAnalysis = new CnisFastAnalysisEntity({
      id: cnisFastAnalysisResult.id,
      cnisDocument: cnisFastAnalysisResult.cnisDocument,
      analysisToolClient,
      status: cnisFastAnalysisResult.status,
      createdBy: cnisFastAnalysisResult.createdBy.id,
      updatedBy: organizationMember.id,
      deletedAt: new Date(),
    });

    const updateTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.updateCnisFastAnalysis(
        cnisFastAnalysisResult.id,
        cnisFastAnalysis,
      );

    const deleteTransaction =
      this.cnisFastAnalysisCommandRepositoryGateway.deleteCnisFastAnalysis(
        cnisFastAnalysisResult.id,
      );

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      updateTransaction,
      deleteTransaction,
    ]);

    await transaction.commit();

    return DeleteCnisFastAnalysisResponseDto.build({
      cnisFastAnalysisId: cnisFastAnalysisResult.id,
    });
  }
}
