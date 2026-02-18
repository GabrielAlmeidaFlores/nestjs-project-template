import { Inject, Injectable } from '@nestjs/common';

import { BaseTransactionRepositoryGateway } from '@core/domain/repository/base/transaction/base.transaction.repository.gateway';
import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisCommandRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/command/rural-timeline-analysis.command.repository.gateway';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisEntity } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/rural-timeline-analysis.entity';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { UpdateRuralTimelineAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis.request.dto';
import { UpdateRuralTimelineAnalysisResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis.response.dto';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisUseCase {
  protected readonly _type = UpdateRuralTimelineAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisQueryRepositoryGateway: RuralTimelineAnalysisQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisCommandRepositoryGateway)
    private readonly ruralTimelineAnalysisCommandRepositoryGateway: RuralTimelineAnalysisCommandRepositoryGateway,
    @Inject(BaseTransactionRepositoryGateway)
    private readonly baseTransactionRepositoryGateway: BaseTransactionRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: UpdateRuralTimelineAnalysisRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisResponseDto> {
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

    const existingEntity =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findOneById(
        ruralTimelineAnalysisId,
      );

    if (existingEntity === null) {
      throw new RuralTimelineAnalysisNotFoundError();
    }

    const updatedEntity = new RuralTimelineAnalysisEntity({
      id: ruralTimelineAnalysisId,
      analysisToolClientId: existingEntity.analysisToolClientId,
      ruralTimelineCompleteAnalysis:
        dto.ruralTimelineCompleteAnalysis ??
        existingEntity.ruralTimelineCompleteAnalysis,
      ruralTimelineSimplifiedAnalysis:
        dto.ruralTimelineSimplifiedAnalysis ??
        existingEntity.ruralTimelineSimplifiedAnalysis,
      ruralTimelinePeriodDocumentAnalysis:
        dto.ruralTimelinePeriodDocumentAnalysis ??
        existingEntity.ruralTimelinePeriodDocumentAnalysis,
      workRegime: dto.workRegime ?? existingEntity.workRegime,
      createdAt: existingEntity.createdAt,
      updatedAt: existingEntity.updatedAt,
      deletedAt: existingEntity.deletedAt,
    });

    const transaction = await this.baseTransactionRepositoryGateway.execute(
      this.ruralTimelineAnalysisCommandRepositoryGateway.updateRuralTimeline(
        updatedEntity,
      ),
    );

    await transaction.commit();

    return UpdateRuralTimelineAnalysisResponseDto.build({
      ruralTimelineAnalysisId: updatedEntity.id,
    });
  }
}
