import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/query/rural-timeline-analysis-period.query.repository.gateway';
import { RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/command/rural-timeline-analysis-period-residence.command.repository.gateway';
import { RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/query/rural-timeline-analysis-period-residence.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodResidenceEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-residence/rural-timeline-analysis-period-residence.entity';
import { UpdateRuralTimelineAnalysisPeriodResidenceRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-period-residence.request.dto';
import { UpdateRuralTimelineAnalysisPeriodResidenceResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-period-residence.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-not-found.error';
import { RuralTimelineAnalysisPeriodResidenceNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-residence-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisPeriodResidenceUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisPeriodResidenceUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodQueryRepositoryGateway: RuralTimelineAnalysisPeriodQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodResidenceQueryRepositoryGateway: RuralTimelineAnalysisPeriodResidenceQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodResidenceCommandRepositoryGateway: RuralTimelineAnalysisPeriodResidenceCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    periodId: RuralTimelineAnalysisPeriodId,
    dto: UpdateRuralTimelineAnalysisPeriodResidenceRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodResidenceResponseDto> {
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

    const period =
      await this.ruralTimelineAnalysisPeriodQueryRepositoryGateway.findOneById(
        periodId,
      );

    if (period === null) {
      throw new RuralTimelineAnalysisPeriodNotFoundError();
    }

    if (period.ruralTimelinePeriodResidenceId === null) {
      throw new RuralTimelineAnalysisPeriodResidenceNotFoundError();
    }

    const existingResidence =
      await this.ruralTimelineAnalysisPeriodResidenceQueryRepositoryGateway.findOneById(
        period.ruralTimelinePeriodResidenceId,
      );

    if (existingResidence === null) {
      throw new RuralTimelineAnalysisPeriodResidenceNotFoundError();
    }

    const updatedEntity = new RuralTimelineAnalysisPeriodResidenceEntity({
      id: period.ruralTimelinePeriodResidenceId,
      city: dto.city ?? existingResidence.city,
      stateCode: dto.stateCode ?? existingResidence.stateCode,
      distanceToPropertyKm:
        dto.distanceToPropertyKm ?? existingResidence.distanceToPropertyKm,
      createdAt: existingResidence.createdAt,
      updatedAt: existingResidence.updatedAt,
      deletedAt: existingResidence.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisPeriodResidenceCommandRepositoryGateway.updateRuralTimelineAnalysisPeriodResidence(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisPeriodResidenceResponseDto.build({
      ruralTimelineAnalysisPeriodResidenceId: updatedEntity.id,
    });
  }
}
