import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisPeriodQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/query/rural-timeline-analysis-period.query.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/command/rural-timeline-analysis-period-economic-aspects.command.repository.gateway';
import { RuralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/query/rural-timeline-analysis-period-economic-aspects.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisPeriodEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/rural-timeline-analysis-period.entity';
import { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';
import { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';
import { RuralTimelineAnalysisPeriodEconomicAspectsEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/rural-timeline-analysis-period-economic-aspects.entity';
import { UpdateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-period-economic-aspects.request.dto';
import { UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-period-economic-aspects.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { RuralTimelineAnalysisPeriodEconomicAspectsNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-economic-aspects-not-found.error';
import { RuralTimelineAnalysisPeriodNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-period-not-found.error';
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
    @Inject(RuralTimelineAnalysisPeriodQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisPeriodQueryRepositoryGateway: RuralTimelineAnalysisPeriodQueryRepositoryGateway,
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
    type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum,
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

    const period =
      await this.ruralTimelineAnalysisPeriodQueryRepositoryGateway.findOneById(
        periodId,
      );

    if (period === null) {
      throw new RuralTimelineAnalysisPeriodNotFoundError();
    }

    const existingEconomicAspects =
      await this.ruralTimelineAnalysisPeriodEconomicAspectsQueryRepositoryGateway.findOneByPeriodIdAndType(
        periodId,
        type,
      );

    return existingEconomicAspects === null
      ? await this.createRuralTimelineAnalysisPeriodEconomicAspects(period, dto)
      : await this.updateRuralTimelineAnalysisPeriodEconomicAspects(
          periodId,
          existingEconomicAspects,
          dto,
        );
  }

  private async createRuralTimelineAnalysisPeriodEconomicAspects(
    period: RuralTimelineAnalysisPeriodEntity,
    dto: UpdateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto> {
    const economicAspectsEntity =
      new RuralTimelineAnalysisPeriodEconomicAspectsEntity({
        type: dto.type as RuralTimelineAnalysisPeriodEconomicAspectTypeEnum,
        content: dto.content ?? null,
        ruralTimelinePeriodId: period.id,
      });

    const transaction = await this.baseTransactionRepositoryGateway.execute([
      this.ruralTimelineAnalysisPeriodEconomicAspectsCommandRepositoryGateway.createRuralTimelineAnalysisPeriodEconomicAspects(
        economicAspectsEntity,
      ),
    ]);

    await transaction.commit();

    return UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto.build({
      ruralTimelineAnalysisPeriodEconomicAspectsId: economicAspectsEntity.id,
    });
  }

  private async updateRuralTimelineAnalysisPeriodEconomicAspects(
    periodId: RuralTimelineAnalysisPeriodId,
    existingEconomicAspects: RuralTimelineAnalysisPeriodEconomicAspectsEntity,
    dto: UpdateRuralTimelineAnalysisPeriodEconomicAspectsRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto> {
    if (
      existingEconomicAspects.ruralTimelinePeriodId.toString() !==
      periodId.toString()
    ) {
      throw new RuralTimelineAnalysisPeriodEconomicAspectsNotFoundError();
    }

    const updatedEntity = new RuralTimelineAnalysisPeriodEconomicAspectsEntity({
      id: existingEconomicAspects.id,
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

    return UpdateRuralTimelineAnalysisPeriodEconomicAspectsResponseDto.build({
      ruralTimelineAnalysisPeriodEconomicAspectsId: updatedEntity.id,
    });
  }
}
