import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { JudicialCaseAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/command/judicial-case-analysis.command.repository.gateway';
import { JudicialCaseAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/repository/judicial-case-analysis/query/judicial-case-analysis.query.repository.gateway';
import { JudicialCaseAnalysisId } from '@module/customer/analysis-tool/module/judicial-case-analysis/domain/schema/entity/judicial-case-analysis/value-object/judicial-case-analysis-id/judicial-case-analysis-id.value-object';
import { DeleteJudicialCaseAnalysisResponseDto } from '@module/customer/analysis-tool/module/judicial-case-analysis/dto/response/delete-judicial-case-analysis.response';
import { JudicialCaseAnalysisNotFoundError } from '@module/customer/analysis-tool/module/judicial-case-analysis/error/judicial-case-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteJudicialCaseAnalysisUseCase {
  protected readonly _type = DeleteJudicialCaseAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisQueryRepositoryGateway)
    private readonly judicialCaseAnalysisQueryRepositoryGateway: JudicialCaseAnalysisQueryRepositoryGateway,
    @Inject(JudicialCaseAnalysisCommandRepositoryGateway)
    private readonly judicialCaseAnalysisCommandRepositoryGateway: JudicialCaseAnalysisCommandRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    judicialCaseAnalysisId: JudicialCaseAnalysisId,
  ): Promise<DeleteJudicialCaseAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const judicialCaseAnalysisResult =
      await this.judicialCaseAnalysisQueryRepositoryGateway.findOneByJudicialCaseAnalysisIdAndOrganizationIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        JudicialCaseAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByJudicialCaseAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        judicialCaseAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        JudicialCaseAnalysisNotFoundError,
      );

    const deleteTransaction =
      this.judicialCaseAnalysisCommandRepositoryGateway.deleteJudicialCaseAnalysis(
        judicialCaseAnalysisResult.id,
        organizationMember.id,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.DELETED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id.toString(),
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id.toString(),
        analysisToolRecordId: analysisToolRecordQueryResult.id.toString(),
        transactions: [deleteTransaction],
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transaction.commit();

    return DeleteJudicialCaseAnalysisResponseDto.build({
      judicialCaseAnalysisId: judicialCaseAnalysisResult.id,
    });
  }
}
