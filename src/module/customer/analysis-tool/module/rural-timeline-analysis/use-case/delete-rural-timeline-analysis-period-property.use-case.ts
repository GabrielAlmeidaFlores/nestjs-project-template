import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisPeriodCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/command/rural-timeline-analysis-period.command.repository.gateway';
import { RuralTimelineAnalysisPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/query/rural-timeline-analysis-period.query.repository.gateway';
import { RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/command/rural-timeline-analysis-period-property.command.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodPropertyId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-property/value-object/rural-timeline-analysis-period-property-id/rural-timeline-analysis-period-property-id.value-object';
import { DeleteRuralTimelineAnalysisPeriodPropertyResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/delete-rural-timeline-analysis-period-property.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class DeleteRuralTimelineAnalysisPeriodPropertyUseCase {
  protected readonly _type =
    DeleteRuralTimelineAnalysisPeriodPropertyUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodQueryRepositoryGateway: RuralTimelineAnalysisPeriodQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodPropertyCommandRepositoryGateway: RuralTimelineAnalysisPeriodPropertyCommandRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodCommandRepositoryGateway: RuralTimelineAnalysisPeriodCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    periodId: RuralTimelineAnalysisPeriodId,
    ruralTimelineAnalysisPeriodPropertyId: RuralTimelineAnalysisPeriodPropertyId,
  ): Promise<DeleteRuralTimelineAnalysisPeriodPropertyResponseDto> {
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

    const updatedPeriod = new RuralTimelineAnalysisPeriodEntity({
      id: period.id,
      startDate: period.startDate,
      endDate: period.endDate,
      workerType: period.workerType,
      workRegimeType: period.workRegimeType,
      productionDestination: period.productionDestination,
      documentAnalysis: period.documentAnalysis,
      ruralTimelineId: period.ruralTimelineId,
      ruralTimelinePeriodPropertyId: null,
      ruralTimelinePeriodResidenceId: period.ruralTimelinePeriodResidenceId,
      createdAt: period.createdAt,
      updatedAt: new Date(),
      deletedAt: period.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralTimelineAnalysisPeriodPropertyCommandRepositoryGateway.deleteRuralTimelineAnalysisPeriodProperty(
        ruralTimelineAnalysisPeriodPropertyId,
      ),
      this.ruralTimelineAnalysisPeriodCommandRepositoryGateway.updateRuralTimelineAnalysisPeriod(
        updatedPeriod,
      ),
    ]);

    await transaction.commit();

    return DeleteRuralTimelineAnalysisPeriodPropertyResponseDto.build({
      ruralTimelineAnalysisPeriodPropertyId,
    });
  }
}
