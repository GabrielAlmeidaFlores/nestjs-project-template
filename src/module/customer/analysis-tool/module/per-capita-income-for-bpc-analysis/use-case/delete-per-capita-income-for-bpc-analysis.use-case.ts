import { Injectable, Inject } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/command/per-capita-income-for-bpc-analysis.command.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/repository/per-capita-income-for-bpc-analysis/query/per-capita-income-for-bpc-analysis.query.repository.gateway';
import { PerCapitaIncomeForBpcAnalysisId } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/domain/schema/entity/per-capita-income-for-bpc-analysis/value-object/per-capita-income-for-bpc-analysis-id/per-capita-income-for-bpc-analysis-id.value-object';
import { DeletePerCapitaIncomeForBpcAnalysisResponseDto } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/dto/response/delete-per-capita-income-for-bpc-analysis.response.dto';
import { PerCapitaIncomeForBpcAnalysisNotFoundError } from '@module/customer/analysis-tool/module/per-capita-income-for-bpc-analysis/error/per-capita-income-for-bpc-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeletePerCapitaIncomeForBpcAnalysisUseCase {
  protected readonly _type = DeletePerCapitaIncomeForBpcAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisQueryRepositoryGateway: PerCapitaIncomeForBpcAnalysisQueryRepositoryGateway,
    @Inject(PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway)
    private readonly perCapitaIncomeForBpcAnalysisCommandRepositoryGateway: PerCapitaIncomeForBpcAnalysisCommandRepositoryGateway,
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
    perCapitaIncomeForBpcAnalysisId: PerCapitaIncomeForBpcAnalysisId,
  ): Promise<DeletePerCapitaIncomeForBpcAnalysisResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const perCapitaIncomeForBpcAnalysisResult =
      await this.perCapitaIncomeForBpcAnalysisQueryRepositoryGateway.findOneByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByPerCapitaIncomeForBpcAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
        perCapitaIncomeForBpcAnalysisId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        PerCapitaIncomeForBpcAnalysisNotFoundError,
      );

    const deleteTransaction =
      this.perCapitaIncomeForBpcAnalysisCommandRepositoryGateway.deletePerCapitaIncomeForBpcAnalysis(
        perCapitaIncomeForBpcAnalysisResult.id,
        organizationMember.id,
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

    return DeletePerCapitaIncomeForBpcAnalysisResponseDto.build({
      perCapitaIncomeForBpcAnalysisId: perCapitaIncomeForBpcAnalysisResult.id,
    });
  }
}
