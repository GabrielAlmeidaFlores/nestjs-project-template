import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/command/disability-assessment-for-bpc-analysis.command.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/disability-assessment-for-bpc-analysis.query.repository.gateway';
import { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import { DeleteDisabilityAssessmentForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/dto/response/delete-disability-assessment-for-bpc-analysis.response';
import { DisabilityAssessmentForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/error/disability-assessment-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteDisabilityAssessmentForBpcAnalysisUseCase {
  protected readonly _type =
    DeleteDisabilityAssessmentForBpcAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisQueryRepositoryGateway: DisabilityAssessmentForBpcAnalysisQueryRepositoryGateway,
    @Inject(DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway)
    private readonly disabilityAssessmentForBpcAnalysisCommandRepositoryGateway: DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    disabilityAssessmentForBpcAnalysisId: DisabilityAssessmentForBpcAnalysisId,
  ): Promise<DeleteDisabilityAssessmentForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const disabilityAssessmentForBpcAnalysisResult =
      await this.disabilityAssessmentForBpcAnalysisQueryRepositoryGateway.findOneByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    const deleteTransaction =
      this.disabilityAssessmentForBpcAnalysisCommandRepositoryGateway.deleteDisabilityAssessmentForBpcAnalysis(
        disabilityAssessmentForBpcAnalysisResult.id,
        organizationMember.id,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByDisabilityAssessmentForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        disabilityAssessmentForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        DisabilityAssessmentForBpcAnalysisNotFoundError,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.DELETED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions: [deleteTransaction],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return DeleteDisabilityAssessmentForBpcAnalysisResponseDto.build({
      disabilityAssessmentForBpcAnalysisId:
        disabilityAssessmentForBpcAnalysisResult.id,
    });
  }
}
