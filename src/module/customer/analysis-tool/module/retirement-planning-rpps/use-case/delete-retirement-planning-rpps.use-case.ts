import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { RetirementPlanningRppsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/command/retirement-planning-rpps.command.repository.gateway';
import { RetirementPlanningRppsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/repository/retirement-planning-rpps/query/retirement-planning-rpps.query.repository.gateway';
import { RetirementPlanningRppsId } from '@module/customer/analysis-tool/module/retirement-planning-rpps/domain/schema/entity/retirement-planning-rpps/value-object/retirement-planning-rpps-id.value-object';
import { DeleteRetirementPlanningRppsResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rpps/dto/response/delete-retirement-planning-rpps.response.dto';
import { RetirementPlanningRppsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rpps/error/retirement-planning-rpps-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRetirementPlanningRppsUseCase {
  protected readonly _type = DeleteRetirementPlanningRppsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsQueryRepositoryGateway)
    private readonly retirementPlanningRppsQueryRepositoryGateway: RetirementPlanningRppsQueryRepositoryGateway,
    @Inject(RetirementPlanningRppsCommandRepositoryGateway)
    private readonly retirementPlanningRppsCommandRepositoryGateway: RetirementPlanningRppsCommandRepositoryGateway,
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
    retirementPlanningRppsId: RetirementPlanningRppsId,
  ): Promise<DeleteRetirementPlanningRppsResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (!organizationMember) {
      throw new OrganizationMemberNotFoundError();
    }

    const retirementPlanningRppsResult =
      await this.retirementPlanningRppsQueryRepositoryGateway.findOneByRetirementPlanningIdAndOrganizationIdOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        RetirementPlanningRppsNotFoundError,
      );

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRppsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRppsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRppsNotFoundError,
      );

    const deleteTransaction =
      this.retirementPlanningRppsCommandRepositoryGateway.deleteRetirementPlanningRpps(
        retirementPlanningRppsResult.id,
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

    return DeleteRetirementPlanningRppsResponseDto.build({
      retirementPlanningRppsId: retirementPlanningRppsResult.id,
    });
  }
}
