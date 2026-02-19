import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/update-rural-timeline-analysis-cnis-contribution-period.request.dto';
import { UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/update-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { SyncRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/sync-rural-timeline-analysis-cnis-contribution-period.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase {
  protected readonly _type =
    UpdateRuralTimelineAnalysisCnisContributionPeriodUseCase.name;

  public constructor(
    private readonly syncRuralTimelineAnalysisCnisContributionPeriodUseCase: SyncRuralTimelineAnalysisCnisContributionPeriodUseCase,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    _contributionPeriodId: RuralTimelineAnalysisCnisContributionPeriodId,
    dto: UpdateRuralTimelineAnalysisCnisContributionPeriodRequestDto,
  ): Promise<UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
    const syncResult =
      await this.syncRuralTimelineAnalysisCnisContributionPeriodUseCase.execute(
        sessionData,
        organizationSessionData,
        ruralTimelineAnalysisId,
        dto as any,
      );

    return UpdateRuralTimelineAnalysisCnisContributionPeriodResponseDto.build({
      ruralTimelineAnalysisCnisContributionPeriodId:
        new RuralTimelineAnalysisCnisContributionPeriodId(
          syncResult.contributionPeriodId,
        ),
    });
  }
}
