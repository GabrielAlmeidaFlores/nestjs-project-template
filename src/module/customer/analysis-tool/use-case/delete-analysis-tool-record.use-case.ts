import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordCommandRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/command/analysis-tool-record.command.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { AnalysisToolRecordId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-record/value-object/analysis-tool-record-id/analysis-tool-record-id.value-objects';
import { DeleteAnalysisToolRecordResponseDto } from '@module/customer/analysis-tool/dto/response/delete-analysis-tool-record.response';
import { AnalysisToolRecordNotFoundError } from '@module/customer/analysis-tool/error/analysis-tool-record-not-found.error';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { DeleteCnisFastAnalysisUseCase } from '@module/customer/analysis-tool/use-case/delete-cnis-fast-analysis.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteAnalysisToolRecordUseCase {
  protected readonly _type = DeleteAnalysisToolRecordUseCase.name;

  public constructor(
    private readonly deleteCnisFastAnalysisUseCase: DeleteCnisFastAnalysisUseCase,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisToolRecordCommandRepositoryGateway)
    private readonly analysisToolRecordCommandRepositoryGateway: AnalysisToolRecordCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    analysisToolRecordId: AnalysisToolRecordId,
  ): Promise<DeleteAnalysisToolRecordResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordResult =
      await this.analysisToolRecordQueryRepositoryGateway.findOneByIdAndAuthIdentityIdWithRelationsOrFail(
        analysisToolRecordId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        AnalysisToolRecordNotFoundError,
      );

    if (analysisToolRecordResult.cnisFastAnalysis !== null) {
      await this.deleteCnisFastAnalysisUseCase.execute(
        sessionData,
        organizationSessionData,
        analysisToolRecordResult.cnisFastAnalysis.id,
      );
    }

    const deleteTransaction =
      this.analysisToolRecordCommandRepositoryGateway.deleteAnalysisToolRecord(
        analysisToolRecordResult.id,
      );

    const transaction =
      await this.baseTransactionRepositoryGateway.execute(deleteTransaction);

    await transaction.commit();

    return DeleteAnalysisToolRecordResponseDto.build({
      analysisToolRecordId: analysisToolRecordResult.id,
    });
  }
}
