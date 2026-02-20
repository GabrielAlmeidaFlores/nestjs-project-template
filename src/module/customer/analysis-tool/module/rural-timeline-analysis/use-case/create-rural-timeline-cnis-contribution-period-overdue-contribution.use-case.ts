import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/command/rural-timeline-cnis-contribution-period-overdue-contribution.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { RuralTimelineCnisContributionPeriodOverdueContributionEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/rural-timeline-cnis-contribution-period-overdue-contribution.entity';
import { RuralTimelineCnisContributionPeriodOverdueContributionId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-cnis-contribution-period-overdue-contribution/value-object/rural-timeline-cnis-contribution-period-overdue-contribution-id/rural-timeline-cnis-contribution-period-overdue-contribution-id.value-object';
import { CreateRuralTimelineCnisContributionPeriodOverdueContributionRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-cnis-contribution-period-overdue-contribution.request.dto';
import { CreateRuralTimelineCnisContributionPeriodOverdueContributionResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-cnis-contribution-period-overdue-contribution.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRuralTimelineCnisContributionPeriodOverdueContributionUseCase {
  protected readonly _type =
    CreateRuralTimelineCnisContributionPeriodOverdueContributionUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(
      RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway,
    )
    private readonly ruralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway: RuralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    dto: CreateRuralTimelineCnisContributionPeriodOverdueContributionRequestDto,
  ): Promise<CreateRuralTimelineCnisContributionPeriodOverdueContributionResponseDto> {
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

    const newEntity =
      new RuralTimelineCnisContributionPeriodOverdueContributionEntity({
        id: new RuralTimelineCnisContributionPeriodOverdueContributionId(),
        ruralTimelineCnisContributionPeriodId: contributionPeriodId,
        overdueDate: dto.overdueDate,
        paymentDate: dto.paymentDate ?? null,
        createdAt: new Date(),
        updatedAt: new Date(),
        deletedAt: null,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineCnisContributionPeriodOverdueContributionCommandRepositoryGateway.createRuralTimelineCnisContributionPeriodOverdueContribution(
        newEntity,
      ),
    );

    await transaction.commit();

    return CreateRuralTimelineCnisContributionPeriodOverdueContributionResponseDto.build(
      {
        ruralTimelineCnisContributionPeriodOverdueContributionId: newEntity.id,
      },
    );
  }
}
