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
  PendingExitDateResponseDto,
} from '@module/customer/analysis-tool/module/rural-timeline-analysis/dto/response/get-rural-timeline-cnis-analysis.response.dto';
import { CnisTimelinePeriodTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/enum/cnis-timeline-period-type.enum';
import { RuralTimelineAnalysisNotFoundError } from '@module/customer/analysis-tool/module/rural-timeline-analysis/error/rural-timeline-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';
import { SessionDataModel } from '@shared/api/util/decorator/property/get-session-data/model/generic/session-data.model';

type TimelineIntervalType = {
  startDate: Date;
  endDate: Date;
};

@Injectable()
export class GetRuralTimelineCnisAnalysisUseCase {
  private static readonly MONTHS_IN_YEAR = 12;

  private static readonly OVERLAP_LIMIT_DAYS_PER_YEAR = 120;

  private static readonly HOURS_IN_DAY = 24;

  private static readonly MINUTES_IN_HOUR = 60;

  private static readonly SECONDS_IN_MINUTE = 60;

  private static readonly MILLISECONDS_IN_SECOND = 1000;

  private static readonly LAST_MONTH_OF_YEAR = 11;

  private static readonly LAST_DAY_OF_YEAR = 31;

  private static readonly MILLISECONDS_IN_DAY =
    GetRuralTimelineCnisAnalysisUseCase.HOURS_IN_DAY *
    GetRuralTimelineCnisAnalysisUseCase.MINUTES_IN_HOUR *
    GetRuralTimelineCnisAnalysisUseCase.SECONDS_IN_MINUTE *
    GetRuralTimelineCnisAnalysisUseCase.MILLISECONDS_IN_SECOND;

  private static readonly RURAL_CATEGORIES = [
    'segurado especial',
    'trabalhador rural',
    'empregado rural',
  ];

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
    let totalUrbanMonths = 0;
    let totalPendingMonths = 0;

    for (const period of ruralTimelineAnalysis.ruralTimelineCnisContributionPeriod) {
      if (period.startDate && period.endDate) {
        const startDate = period.startDate;
        const endDate = period.endDate;

        if (earliestDate === null || startDate < earliestDate) {
          earliestDate = startDate;
        }
        if (latestDate === null || endDate > latestDate) {
          latestDate = endDate;
        }

        const months = this.calculateMonthsBetweenDates(startDate, endDate);

        let type: CnisTimelinePeriodTypeEnum = this.isRuralCategory(
          period.category,
        )
          ? CnisTimelinePeriodTypeEnum.RURAL
          : CnisTimelinePeriodTypeEnum.URBAN;
        let description: string | null = null;

        if (
          period.status ===
          RuralTimelineAnalysisCnisContributionPeriodStatusEnum.PENDING
        ) {
          type = CnisTimelinePeriodTypeEnum.PENDING;
          totalPendingMonths += months;
          description = 'Período pendente de validação';
        } else if (type === CnisTimelinePeriodTypeEnum.URBAN) {
          totalUrbanMonths += months;
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

      if (
        period.ruralTimelineCnisContributionPeriodPendingExitDate.length > 0 &&
        period.endDate
      ) {
        const orderedPendingExitDates =
          period.ruralTimelineCnisContributionPeriodPendingExitDate
            .slice()
            .sort((a, b) => a.pendingDate.getTime() - b.pendingDate.getTime());

        const pendingExitDates = orderedPendingExitDates.map((pending) =>
          PendingExitDateResponseDto.build({
            pendingDate: pending.pendingDate,
            pendingAmount: pending.pendingAmount,
          }),
        );

        const firstPendingDate = orderedPendingExitDates[0]?.pendingDate;
        const lastPendingDate =
          orderedPendingExitDates[orderedPendingExitDates.length - 1]
            ?.pendingDate;

        if (firstPendingDate && lastPendingDate) {
          if (earliestDate === null || firstPendingDate < earliestDate) {
            earliestDate = firstPendingDate;
          }
          if (latestDate === null || lastPendingDate > latestDate) {
            latestDate = lastPendingDate;
          }

          const months = this.calculateMonthsBetweenDates(
            firstPendingDate,
            lastPendingDate,
          );

          const isResolved =
            period.status ===
            RuralTimelineAnalysisCnisContributionPeriodStatusEnum.VALID;

          if (isResolved) {
            totalRuralMonths += months;
            periods.push(
              CnisTimelinePeriodResponseDto.build({
                type: CnisTimelinePeriodTypeEnum.RURAL,
                startDate: firstPendingDate,
                endDate: lastPendingDate,
              }),
            );
          } else {
            totalPendingMonths += months;
            periods.push(
              CnisTimelinePeriodResponseDto.build({
                type: CnisTimelinePeriodTypeEnum.PENDING,
                startDate: firstPendingDate,
                endDate: lastPendingDate,
                description:
                  'Período sem data de saída - aguardando informações de encerramento',
                pendingExitDates,
              }),
            );
          }
        }
      }
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
        }),
      );
    }

    periods.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    const { periods: periodsWithOverlapsAndGaps, totalOverlapMonths } =
      this.generateOverlapsAndGaps(periods);

    let filteredPeriods = periodsWithOverlapsAndGaps;

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
      overlapMonths: totalOverlapMonths,
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

  private generateOverlapsAndGaps(
    sortedPeriods: CnisTimelinePeriodResponseDto[],
  ): {
    periods: CnisTimelinePeriodResponseDto[];
    totalOverlapMonths: number;
  } {
    const result: CnisTimelinePeriodResponseDto[] = [...sortedPeriods];

    const overlaps = this.detectEligibleUrbanRuralOverlaps(sortedPeriods);
    const totalOverlapMonths = overlaps.reduce(
      (accumulator, overlap) =>
        accumulator +
        this.calculateMonthsBetweenDates(overlap.startDate, overlap.endDate),
      0,
    );

    const activityPeriods = sortedPeriods.filter((period) =>
      [
        CnisTimelinePeriodTypeEnum.RURAL,
        CnisTimelinePeriodTypeEnum.URBAN,
        CnisTimelinePeriodTypeEnum.PENDING,
      ].includes(period.type),
    );

    const gaps = this.detectGaps(activityPeriods);

    result.push(...overlaps, ...gaps);
    result.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return {
      periods: result,
      totalOverlapMonths,
    };
  }

  private detectEligibleUrbanRuralOverlaps(
    periods: CnisTimelinePeriodResponseDto[],
  ): CnisTimelinePeriodResponseDto[] {
    const ruralPeriods = periods.filter(
      (period) => period.type === CnisTimelinePeriodTypeEnum.RURAL,
    );
    const urbanPeriods = periods.filter(
      (period) => period.type === CnisTimelinePeriodTypeEnum.URBAN,
    );

    const overlapIntervalsByYear = new Map<number, TimelineIntervalType[]>();

    for (const ruralPeriod of ruralPeriods) {
      for (const urbanPeriod of urbanPeriods) {
        if (
          !this.periodsOverlap(
            ruralPeriod.startDate,
            ruralPeriod.endDate,
            urbanPeriod.startDate,
            urbanPeriod.endDate,
          )
        ) {
          continue;
        }

        const overlapStart = this.maxDate(
          ruralPeriod.startDate,
          urbanPeriod.startDate,
        );
        const overlapEnd = this.minDate(
          ruralPeriod.endDate,
          urbanPeriod.endDate,
        );

        for (const yearlyInterval of this.splitIntervalByCivilYear({
          startDate: overlapStart,
          endDate: overlapEnd,
        })) {
          const year = yearlyInterval.startDate.getFullYear();
          const yearIntervals = overlapIntervalsByYear.get(year) ?? [];
          yearIntervals.push(yearlyInterval);
          overlapIntervalsByYear.set(year, yearIntervals);
        }
      }
    }

    const overlaps: CnisTimelinePeriodResponseDto[] = [];

    for (const [, intervals] of overlapIntervalsByYear) {
      const mergedIntervals = this.mergeIntervals(intervals);
      const totalDays = mergedIntervals.reduce(
        (accumulator, interval) =>
          accumulator +
          this.calculateDaysBetweenDates(interval.startDate, interval.endDate),
        0,
      );

      if (
        totalDays <=
        GetRuralTimelineCnisAnalysisUseCase.OVERLAP_LIMIT_DAYS_PER_YEAR
      ) {
        continue;
      }

      for (const interval of mergedIntervals) {
        overlaps.push(
          CnisTimelinePeriodResponseDto.build({
            type: CnisTimelinePeriodTypeEnum.OVERLAP,
            startDate: interval.startDate,
            endDate: interval.endDate,
            description: 'Sobreposição entre período rural e período urbano',
          }),
        );
      }
    }

    overlaps.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());
    return overlaps;
  }

  private splitIntervalByCivilYear(
    interval: TimelineIntervalType,
  ): TimelineIntervalType[] {
    const intervals: TimelineIntervalType[] = [];

    let currentStart = this.normalizeDate(interval.startDate);
    const normalizedEndDate = this.normalizeDate(interval.endDate);

    while (currentStart <= normalizedEndDate) {
      const endOfCurrentYear = new Date(
        currentStart.getFullYear(),
        GetRuralTimelineCnisAnalysisUseCase.LAST_MONTH_OF_YEAR,
        GetRuralTimelineCnisAnalysisUseCase.LAST_DAY_OF_YEAR,
      );
      const currentEnd = this.minDate(endOfCurrentYear, normalizedEndDate);

      intervals.push({
        startDate: currentStart,
        endDate: currentEnd,
      });

      currentStart = this.addDays(currentEnd, 1);
    }

    return intervals;
  }

  private mergeIntervals(
    intervals: TimelineIntervalType[],
  ): TimelineIntervalType[] {
    if (intervals.length === 0) {
      return [];
    }

    const sortedIntervals = intervals
      .map((interval) => ({
        startDate: this.normalizeDate(interval.startDate),
        endDate: this.normalizeDate(interval.endDate),
      }))
      .sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    const firstInterval = sortedIntervals[0];

    if (!firstInterval) {
      return [];
    }

    const merged: TimelineIntervalType[] = [
      {
        startDate: firstInterval.startDate,
        endDate: firstInterval.endDate,
      },
    ];

    for (let i = 1; i < sortedIntervals.length; i++) {
      const current = sortedIntervals[i];
      const lastMerged = merged[merged.length - 1];

      if (!current || !lastMerged) {
        continue;
      }

      const dayAfterLastMerged = this.addDays(lastMerged.endDate, 1);

      if (current.startDate <= dayAfterLastMerged) {
        if (current.endDate > lastMerged.endDate) {
          lastMerged.endDate = current.endDate;
        }
        continue;
      }

      merged.push({
        startDate: current.startDate,
        endDate: current.endDate,
      });
    }

    return merged;
  }

  private calculateDaysBetweenDates(startDate: Date, endDate: Date): number {
    const normalizedStartDate = this.normalizeDate(startDate);
    const normalizedEndDate = this.normalizeDate(endDate);

    return (
      Math.floor(
        (normalizedEndDate.getTime() - normalizedStartDate.getTime()) /
          GetRuralTimelineCnisAnalysisUseCase.MILLISECONDS_IN_DAY,
      ) + 1
    );
  }

  private normalizeDate(date: Date): Date {
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }

  private detectGaps(
    activityPeriods: CnisTimelinePeriodResponseDto[],
  ): CnisTimelinePeriodResponseDto[] {
    const mergedActivityIntervals = this.mergeIntervals(
      activityPeriods.map((period) => ({
        startDate: period.startDate,
        endDate: period.endDate,
      })),
    );

    const gaps: CnisTimelinePeriodResponseDto[] = [];

    for (let i = 0; i < mergedActivityIntervals.length - 1; i++) {
      const currentPeriod = mergedActivityIntervals[i];
      const nextPeriod = mergedActivityIntervals[i + 1];

      if (!currentPeriod || !nextPeriod) {
        continue;
      }

      const dayAfterCurrent = this.addDays(currentPeriod.endDate, 1);

      if (dayAfterCurrent < nextPeriod.startDate) {
        const gapStart = dayAfterCurrent;
        const gapEnd = this.addDays(nextPeriod.startDate, -1);

        gaps.push(
          CnisTimelinePeriodResponseDto.build({
            type: CnisTimelinePeriodTypeEnum.GAP,
            startDate: gapStart,
            endDate: gapEnd,
            description: 'Intervalo sem atividade registrada',
          }),
        );
      }
    }

    return gaps;
  }

  private periodsOverlap(
    start1: Date,
    end1: Date,
    start2: Date,
    end2: Date,
  ): boolean {
    return start1 <= end2 && start2 <= end1;
  }

  private maxDate(date1: Date, date2: Date): Date {
    return date1 > date2 ? date1 : date2;
  }

  private minDate(date1: Date, date2: Date): Date {
    return date1 < date2 ? date1 : date2;
  }

  private isRuralCategory(category?: string | null): boolean {
    if (category === null || category === undefined || category === '') {
      return true;
    }
    const lower = category.toLowerCase().trim();
    return GetRuralTimelineCnisAnalysisUseCase.RURAL_CATEGORIES.some(
      (pattern) => lower.includes(pattern),
    );
  }

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
