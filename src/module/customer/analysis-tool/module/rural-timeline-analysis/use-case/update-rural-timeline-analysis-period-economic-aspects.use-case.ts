import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/command/rural-timeline-analysis-period-economic-aspects.command.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/query/rural-timeline-analysis-period-economic-aspects.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import { RuralTimelineAnalysisPeriodEconomicAspectsId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/value-object/rural-timeline-analysis-period-economic-aspects-id/rural-timeline-analysis-period-economic-aspects-id.value-object';
import { UpdateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-period-economic-aspects.request.dto';
import { UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-period-economic-aspects.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodEconomicAspectsNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-economic-aspects-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisPeriodEconomicAspectsUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisPeriodEconomicAspectsUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway: RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway: RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    periodId: RuralTimelineAnalysisPeriodId,
    economicAspectsId: RuralTimelineAnalysisPeriodEconomicAspectsId,
    dto: UpdateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto> {
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

    const existingEconomicAspects =
      await this.ruralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway.findOneById(
        economicAspectsId,
      );

    if (existingEconomicAspects === null) {
      throw new RuralTimelineAnalysisPeriodEconomicAspectsNotFoundError();
    }

    if (
      existingEconomicAspects.ruralTimelinePeriodId.toString() !==
      periodId.toString()
    ) {
      throw new RuralTimelineAnalysisPeriodEconomicAspectsNotFoundError();
    }

    const updatedEntity = new RuralTimelineAnalysisPeriodEconomicAspectsEntity({
      id: economicAspectsId,
      ruralTimelinePeriodId: existingEconomicAspects.ruralTimelinePeriodId,
      type: dto.type ?? existingEconomicAspects.type,
      content: dto.content ?? existingEconomicAspects.content,
      createdAt: existingEconomicAspects.createdAt,
      updatedAt: existingEconomicAspects.updatedAt,
      deletedAt: existingEconomicAspects.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway.updateRuralTimelineAnalysisPeriodEconomicAspects(
        updatedEntity,
      ),
    );

    await transaction.commit();

    const response =
      new UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto();
    response.success = true;

    return response;
  }
}
