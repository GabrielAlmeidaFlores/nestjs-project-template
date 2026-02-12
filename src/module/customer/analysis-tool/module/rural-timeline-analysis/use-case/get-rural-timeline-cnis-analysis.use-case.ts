import { Inject, Injectable } from '@nestjs/common';

import { OrganizationMemberQueryRepositoryGateway } from '@module/customer/account/domain/repository/organization-member/query/organization-member.query.repository.gateway';
import { AnalysisToolRecordQueryRepositoryGateway } from '@module/customer/analysis-tool/domain/repository/analysis-tool-record/query/analysis-tool-record.query.repository.gateway';
import { OrganizationMemberNotFoundError } from '@module/customer/analysis-tool/error/organization-member-not-found-error.error';
import { RuralTimelineAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis/query/rural-timeline-analysis.query.repository.gateway';
import { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';
import { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import { GetRuralTimelineCnisAnalysisRequestDto } from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/request/get-rural-timeline-cnis-analysis.request.dto';
import {
  CnisTimelineContributionSummaryResponseDto,
  CnisTimelinePeriodResponseDto,
  GetRuralTimelineCnisAnalysisResponseDto,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-cnis-analysis.response.dto';
import { CnisTimelinePeriodTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/enum/cnis-timeline-period-type.enum';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

@Injectable()
export class GetRuralTimelineCnisAnalysisUseCase {
  private static readonly MONTHS_IN_YEAR = 12;

  protected readonly _type = GetRuralTimelineCnisAnalysisUseCase.name;

  public constructor(
    @Inject(OrganizationMemberQueryRepositoryGateway)
    private readonly organizationMemberQueryRepositoryGateway: OrganizationMemberQueryRepositoryGateway,
    @Inject(AnalysisToolRecordQueryRepositoryGateway)
    private readonly analysisToolRecordQueryRepositoryGateway: AnalysisToolRecordQueryRepositoryGateway,
    @Inject(RuralTimelineAnalysisQueryRepositoryGateway)
    private readonly ruralTimelineAnalysisQueryRepositoryGateway: RuralTimelineAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    sessionData: SessionDataModel,
    organizationSessionData: OrganizationSessionDataModel,
    ruralTimelineAnalysisId: RuralTimelineAnalysisId,
    dto: GetRuralTimelineCnisAnalysisRequestDto,
  ): Promise<GetRuralTimelineCnisAnalysisResponseDto> {
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

    const ruralTimelineAnalysis =
      await this.ruralTimelineAnalysisQueryRepositoryGateway.findWithRelationsByRuralTimelineAnalysisIdOrFail(
        ruralTimelineAnalysisId,
      );

    const periods: CnisTimelinePeriodResponseDto[] = [];
    let earliestDate: Date | null = null;
    let latestDate: Date | null = null;

    let totalRuralMonths = 0;
    const totalUrbanMonths = 0;
    let totalPendingMonths = 0;

    for (const period of ruralTimelineAnalysis.ruralTimelineCnisContributionPeriod) {
      if (!period.startDate || !period.endDate) {
        continue;
      }

      const startDate = period.startDate;
      const endDate = period.endDate;

      if (earliestDate === null || startDate < earliestDate) {
        earliestDate = startDate;
      }
      if (latestDate === null || endDate > latestDate) {
        latestDate = endDate;
      }

      const months = this.calculateMonthsBetweenDates(startDate, endDate);

      let type: CnisTimelinePeriodTypeEnum = CnisTimelinePeriodTypeEnum.RURAL;
      let description: string | null = null;

      if (
        period.status ===
        RuralTimelineAnalysisCnisContributionPeriodStatusEnum.PENDING
      ) {
        type = CnisTimelinePeriodTypeEnum.PENDING;
        totalPendingMonths += months;
        description = 'Período pendente de validação';
      } else {
        totalRuralMonths += months;
      }

      periods.push(
        CnisTimelinePeriodResponseDto.build({
          type,
          startDate,
          endDate,
          description,
        }),
      );
    }

    for (const period of ruralTimelineAnalysis.ruralTimelineAnalysisPeriod) {
      const startDate = period.startDate;
      const endDate = period.endDate;

      if (!startDate || !endDate) {
        continue;
      }

      if (earliestDate === null || startDate < earliestDate) {
        earliestDate = startDate;
      }
      if (latestDate === null || endDate > latestDate) {
        latestDate = endDate;
      }

      const months = this.calculateMonthsBetweenDates(startDate, endDate);
      totalRuralMonths += months;

      periods.push(
        CnisTimelinePeriodResponseDto.build({
          type: CnisTimelinePeriodTypeEnum.RURAL,
          startDate,
          endDate,
          description: null,
        }),
      );
    }

    periods.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    let filteredPeriods = periods;

    if (dto.periodTypes && dto.periodTypes.length > 0) {
      filteredPeriods = filteredPeriods.filter((p) =>
        (dto.periodTypes ?? []).includes(p.type),
      );
    }
    if (dto.startDate) {
      const startDate = dto.startDate;
      filteredPeriods = filteredPeriods.filter((p) => p.endDate >= startDate);
    }
    if (dto.endDate) {
      const endDate = dto.endDate;
      filteredPeriods = filteredPeriods.filter((p) => p.startDate <= endDate);
    }

    const summary = CnisTimelineContributionSummaryResponseDto.build({
      ruralYears: Math.floor(
        totalRuralMonths / GetRuralTimelineCnisAnalysisUseCase.MONTHS_IN_YEAR,
      ),
      ruralMonths:
        totalRuralMonths % GetRuralTimelineCnisAnalysisUseCase.MONTHS_IN_YEAR,
      urbanYears: Math.floor(
        totalUrbanMonths / GetRuralTimelineCnisAnalysisUseCase.MONTHS_IN_YEAR,
      ),
      urbanMonths:
        totalUrbanMonths % GetRuralTimelineCnisAnalysisUseCase.MONTHS_IN_YEAR,
      overlapMonths: 0,
      pendingYears: Math.floor(
        totalPendingMonths / GetRuralTimelineCnisAnalysisUseCase.MONTHS_IN_YEAR,
      ),
      pendingMonths:
        totalPendingMonths % GetRuralTimelineCnisAnalysisUseCase.MONTHS_IN_YEAR,
    });

    return GetRuralTimelineCnisAnalysisResponseDto.build({
      periods: filteredPeriods,
      summary,
      earliestDate: earliestDate ?? new Date(),
      latestDate: latestDate ?? new Date(),
    });
  }

  private calculateMonthsBetweenDates(startDate: Date, endDate: Date): number {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const yearsDiff = end.getFullYear() - start.getFullYear();
    const monthsDiff = end.getMonth() - start.getMonth();

    return (
      yearsDiff * GetRuralTimelineCnisAnalysisUseCase.MONTHS_IN_YEAR +
      monthsDiff +
      1
    );
  }
}
