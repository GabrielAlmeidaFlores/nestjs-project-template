import { Injectable } from '@nestjs/common';

import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { CreateRuralTimelineAnalysisCnisContributionPeriodRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/create-rural-timeline-analysis-cnis-contribution-period.request.dto';
import { CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/create-rural-timeline-analysis-cnis-contribution-period.response.dto';
import { SyncRuralTimelineAnalysisCnisContributionPeriodUseCase } from '@module/customer/analysis-tool/module/rural-timeline-analysis/use-case/sync-rural-timeline-analysis-cnis-contribution-period.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class CreateRuralTimelineAnalysisCnisContributionPeriodUseCase {
  protected readonly _type =
    CreateRuralTimelineAnalysisCnisContributionPeriodUseCase.name;

  public constructor(
    private readonly syncRuralTimelineAnalysisCnisContributionPeriodUseCase: SyncRuralTimelineAnalysisCnisContributionPeriodUseCase,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionDataModel: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: CreateRuralTimelineAnalysisCnisContributionPeriodRequestDto,
  ): Promise<CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto> {
    const syncResult =
      await this.syncRuralTimelineAnalysisCnisContributionPeriodUseCase.execute(
        sessionData,
        organizationSessionDataModel,
        ruralTimelineAnalysisId,
        dto as any,
      );

    return CreateRuralTimelineAnalysisCnisContributionPeriodResponseDto.build({
      contributionPeriodId: syncResult.contributionPeriodId,
    });
  }
}
