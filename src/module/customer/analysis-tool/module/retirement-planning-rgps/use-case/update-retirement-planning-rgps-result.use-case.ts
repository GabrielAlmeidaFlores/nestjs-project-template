import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { AnalysisActivityTrackerGateway } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/analysis-activity-tracker.gateway';
import { AnalysisActivityActionEnum } from '@module/customer/analysis-tool/lib/analysis-activity-tracker/enum/analysis-activity-action.enum';
import { RetirementPlanningRgpsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps/query/retirement-planning-rgps.query.repository.gateway';
import { RetirementPlanningRgpsResultCommandRepositoryGateway } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/repository/retirement-planning-rgps-result/command/retirement-planning-rgps-result.repository.gateway';
import { RetirementPlanningRgpsId } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps/value-object/retirement-planning-rgps-id.value-object';
import { RetirementPlanningRgpsResultEntity } from '@module/customer/analysis-tool/module/retirement-planning-rgps/domain/schema/entity/retirement-planning-rgps-result/retirement-planning-rgps-result.entity';
import { UpdateRetirementPlanningRgpsResultRequestDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/request/update-retirement-planning-rgps-result.request.dto';
import { UpdateRetirementPlanningRgpsResultResponseDto } from '@module/customer/analysis-tool/module/retirement-planning-rgps/dto/response/update-retirement-planning-rgps-result.response.dto';
import { RetirementPlanningRgpsNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-not-found.error';
import { RetirementPlanningRgpsResultNotFoundError } from '@module/customer/analysis-tool/module/retirement-planning-rgps/error/retirement-planning-rgps-result-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRetirementPlanningRgpsResultUseCase {
  protected readonly _type = UpdateRetirementPlanningRgpsResultUseCase.name;

  public constructor(
    @Inject(RetirementPlanningRgpsQueryRepositoryGateway)
    private readonly retirementPlanningRgpsQueryRepositoryGateway: RetirementPlanningRgpsQueryRepositoryGateway,
    @Inject(RetirementPlanningRgpsResultCommandRepositoryGateway)
    private readonly retirementPlanningRgpsResultCommandRepositoryGateway: RetirementPlanningRgpsResultCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(AnalysisActivityTrackerGateway)
    private readonly analysisActivityTrackerGateway: AnalysisActivityTrackerGateway,
  ) {}

  public async execute(
    retirementPlanningRgpsId: RetirementPlanningRgpsId,
    dto: UpdateRetirementPlanningRgpsResultRequestDto,
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
  ): Promise<UpdateRetirementPlanningRgpsResultResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    const analysisToolRecordQueryResult =
      await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRetirementPlanningRgpsIdAndOrganizationIdAndAuthIdentityIdOrFail(
        retirementPlanningRgpsId,
        organizationSessionData.organizationId,
        sessionData.authIdentityId,
        RetirementPlanningRgpsNotFoundError,
      );

    const retirementPlanningRgps =
      await this.retirementPlanningRgpsQueryRepositoryGateway.findOneByRetirementPlanningRgpsIdOrFailWithRelations(
        retirementPlanningRgpsId,
        RetirementPlanningRgpsNotFoundError,
      );

    if (!retirementPlanningRgps.retirementPlanningRgpsResult) {
      throw new RetirementPlanningRgpsResultNotFoundError();
    }

    const updatedRetirementPlanningRgpsResult =
      new RetirementPlanningRgpsResultEntity({
        ...retirementPlanningRgps.retirementPlanningRgpsResult,
        result: dto.result,
      });

    const updateTransaction =
      this.retirementPlanningRgpsResultCommandRepositoryGateway.updateRetirementPlanningRgpsResult(
        retirementPlanningRgps.retirementPlanningRgpsResult.id,
        updatedRetirementPlanningRgpsResult,
      );

    const transactionsWithActivity =
      this.analysisActivityTrackerGateway.appendActivityTransaction({
        action: AnalysisActivityActionEnum.UPDATED,
        analysisType: analysisToolRecordQueryResult.type,
        organizationMemberId: organizationMember.id,
        analysisToolClientId:
          analysisToolRecordQueryResult.analysisToolClient.id,
        analysisToolRecordId: analysisToolRecordQueryResult.id,
        transactions: [updateTransaction],
      });

    const transactions = await this.baseTransactionRepositoryGateway.execute(
      transactionsWithActivity,
    );

    await transactions.commit();

    return UpdateRetirementPlanningRgpsResultResponseDto.build({
      retirementPlanningRgpsId,
    });
  }
}
