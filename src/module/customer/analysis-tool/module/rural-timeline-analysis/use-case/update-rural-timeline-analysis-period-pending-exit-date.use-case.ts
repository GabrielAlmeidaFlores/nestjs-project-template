import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/command/rural-timeline-analysis-period-pending-exit-date.command.repository.gateway';
import { RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/query/rural-timeline-analysis-period-pending-exit-date.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisPeriodPendingExitDateEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/rural-timeline-analysis-period-pending-exit-date.entity';
import { RuralTimelineAnalysisPeriodPendingExitDateId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-pending-exit-date/value-object/rural-timeline-analysis-period-pending-exit-date-id/rural-timeline-analysis-period-pending-exit-date-id.value-object';
import { UpdateRuralTimelineAnalysisPeriodPendingExitDateRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-period-pending-exit-date.request.dto';
import { UpdateRuralTimelineAnalysisPeriodPendingExitDateResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-period-pending-exit-date.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodPendingExitDateNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-pending-exit-date-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisPeriodPendingExitDateUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisPeriodPendingExitDateUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway: RuralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway: RuralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    pendingExitDateId: RuralTimelineAnalysisPeriodPendingExitDateId,
    dto: UpdateRuralTimelineAnalysisPeriodPendingExitDateRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodPendingExitDateResponseDto> {
    const organizationMember =
      await this.organizationMemberQueryRepositoryGateway.findOneByCustomerIdAndAuthIdentityId(
        sessionData.authIdentityId,
        organizationSessionData.organizationId,
      );

    if (organizationMember === null) {
      throw new OrganizationMemberNotFoundError();
    }

    await this.analysisToolRecordQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdAndOrganizationIdAndAuthIdentityIdOrFail(
      ruralTimelineAnalysisId,
      organizationSessionData.organizationId,
      sessionData.authIdentityId,
      RuralTimelineAnalysisNotFoundError,
    );

    const existingPendingExitDate =
      await this.ruralTimelineAnalysisPeriodPendingExitDateQueryRepositoryGateway.findOneById(
        pendingExitDateId,
      );

    if (existingPendingExitDate === null) {
      throw new RuralTimelineAnalysisPeriodPendingExitDateNotFoundError();
    }

    if (
      existingPendingExitDate.ruralTimelineCnisContributionPeriodId.toString() !==
      contributionPeriodId.toString()
    ) {
      throw new RuralTimelineAnalysisPeriodPendingExitDateNotFoundError();
    }

    const updatedEntity = new RuralTimelineAnalysisPeriodPendingExitDateEntity({
      id: pendingExitDateId,
      ruralTimelineCnisContributionPeriodId:
        existingPendingExitDate.ruralTimelineCnisContributionPeriodId,
      pendingDate: dto.pendingDate ?? existingPendingExitDate.pendingDate,
      pendingAmount: dto.pendingAmount ?? existingPendingExitDate.pendingAmount,
      createdAt: existingPendingExitDate.createdAt,
      updatedAt: existingPendingExitDate.updatedAt,
      deletedAt: existingPendingExitDate.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisPeriodPendingExitDateCommandRepositoryGateway.updateRuralTimelineAnalysisPeriodPendingExitDate(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisPeriodPendingExitDateResponseDto.build({
      ruralTimelineAnalysisPeriodPendingExitDateId: updatedEntity.id,
    });
  }
}
