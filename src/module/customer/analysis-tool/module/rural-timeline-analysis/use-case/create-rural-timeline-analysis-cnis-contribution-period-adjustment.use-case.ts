import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/rural-timeline-analysis-cnis-contribution-period.query.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-adjustment/command/rural-timeline-analysis-cnis-contribution-period-adjustment.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-adjustment/rural-timeline-analysis-cnis-contribution-period-adjustment.entity';
import { CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-cnis-contribution-period-adjustment.request.dto';
import { CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-analysis-cnis-contribution-period-adjustment.response.dto';
import { RuralTimelineAnalysisCnisContributionPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-cnis-contribution-period-not-found.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentUseCase {
  protected readonly _type =
    CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway)
    private readonly cnisContributionPeriodQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodQueryRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway,
    )
    private readonly adjustmentCommandRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodAdjustmentCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    cnisContributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    dto: CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentRequestDto,
  ): Promise<CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto> {
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

    const cnisContributionPeriod =
      await this.cnisContributionPeriodQueryRepositoryGateway.findOneById(
        cnisContributionPeriodId,
      );

    if (cnisContributionPeriod === null) {
      throw new RuralTimelineAnalysisCnisContributionPeriodNotFoundError();
    }

    const adjustmentEntity =
      new RuralTimelineAnalysisCnisContributionPeriodAdjustmentEntity({
        technicalObservation: dto.technicalObservation,
        contributionTimeGainedYears: dto.contributionTimeGainedYears,
        contributionTimeGainedMonths: dto.contributionTimeGainedMonths,
        contributionTimeGainedDays: dto.contributionTimeGainedDays,
        conventionalPeriodStartDate: dto.conventionalPeriodStartDate,
        conventionalPeriodEndDate: dto.conventionalPeriodEndDate,
        ruralTimelineCnisContributionPeriodId: cnisContributionPeriodId,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.adjustmentCommandRepositoryGateway.createRuralTimelineAnalysisCnisContributionPeriodAdjustment(
        adjustmentEntity,
      ),
    );

    await transaction.commit();

    return CreateRuralTimelineAnalysisCnisContributionPeriodAdjustmentResponseDto.build(
      {
        ruralTimelineAnalysisCnisContributionPeriodAdjustmentId:
          adjustmentEntity.id,
      },
    );
  }
}
