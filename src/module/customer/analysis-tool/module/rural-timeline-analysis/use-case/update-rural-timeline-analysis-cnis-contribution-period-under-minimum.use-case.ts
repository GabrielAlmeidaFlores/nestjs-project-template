import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/command/rural-timeline-analysis-cnis-contribution-period-under-minimum.command.repository.gateway';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/query/rural-timeline-analysis-cnis-contribution-period-under-minimum.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/rural-timeline-analysis-cnis-contribution-period-under-minimum.entity';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period-under-minimum/value-object/rural-timeline-analysis-cnis-contribution-period-under-minimum-id/rural-timeline-analysis-cnis-contribution-period-under-minimum-id.value-object';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-cnis-contribution-period-under-minimum.request.dto';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-cnis-contribution-period-under-minimum.response.dto';
import { RuralTimelineAnalysisCnisContributionPeriodUnderMinimumNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-cnis-contribution-period-under-minimum-not-found.error';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway,
    @Inject(
      RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway,
    )
    private readonly ruralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    underMinimumId: RuralTimelineAnalysisCnisContributionPeriodUnderMinimumId,
    dto: UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto> {
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

    const existingUnderMinimum =
      await this.ruralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryRepositoryGateway.findOneById(
        underMinimumId,
      );

    if (existingUnderMinimum === null) {
      throw new RuralTimelineAnalysisCnisContributionPeriodUnderMinimumNotFoundError();
    }

    if (
      existingUnderMinimum.ruralTimelineCnisContributionPeriodId.toString() !==
      contributionPeriodId.toString()
    ) {
      throw new RuralTimelineAnalysisCnisContributionPeriodUnderMinimumNotFoundError();
    }

    const updatedEntity =
      new RuralTimelineAnalysisCnisContributionPeriodUnderMinimumEntity({
        id: underMinimumId,
        ruralTimelineCnisContributionPeriodId:
          existingUnderMinimum.ruralTimelineCnisContributionPeriodId,
        contributionDate:
          dto.contributionDate ?? existingUnderMinimum.contributionDate,
        contributionAmount:
          dto.contributionAmount ?? existingUnderMinimum.contributionAmount,
        createdAt: existingUnderMinimum.createdAt,
        updatedAt: existingUnderMinimum.updatedAt,
        deletedAt: existingUnderMinimum.deletedAt,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisCnisContributionPeriodUnderMinimumCommandRepositoryGateway.updateRuralTimelineAnalysisCnisContributionPeriodUnderMinimum(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisCnisContributionPeriodUnderMinimumResponseDto.build(
      {
        ruralTimelineAnalysisCnisContributionPeriodUnderMinimumId:
          updatedEntity.id,
      },
    );
  }
}
