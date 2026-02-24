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

      if (
        period.ruralTimelineCnisContributionPeriodPendingExitDate.length > 0
      ) {
        const pendingExitDates =
          period.ruralTimelineCnisContributionPeriodPendingExitDate.map(
            (pending) =>
              PendingExitDateResponseDto.build({
                pendingDate: pending.pendingDate,
                pendingAmount: pending.pendingAmount,
              }),
          );

        const firstPendingDate =
          period.ruralTimelineCnisContributionPeriodPendingExitDate[0]
            ?.pendingDate;
        const lastPendingDate =
          period.ruralTimelineCnisContributionPeriodPendingExitDate[
            period.ruralTimelineCnisContributionPeriodPendingExitDate.length - 1
          ]?.pendingDate;

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
      urbanYears: 0,
      urbanMonths: 0,
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
    const result: CnisTimelinePeriodResponseDto[] = [];
    let totalOverlapMonths = 0;

    const overlaps = this.detectAllOverlaps(sortedPeriods);
    for (const overlap of overlaps) {
      const months = this.calculateMonthsBetweenDates(
        overlap.startDate,
        overlap.endDate,
      );
      totalOverlapMonths += months;
    }

    const gaps = this.detectGaps(sortedPeriods);

    result.push(...sortedPeriods);
    result.push(...overlaps);
    result.push(...gaps);

    result.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return {
      periods: result,
      totalOverlapMonths,
    };
  }

  private detectAllOverlaps(
    periods: CnisTimelinePeriodResponseDto[],
  ): CnisTimelinePeriodResponseDto[] {
    const overlaps: CnisTimelinePeriodResponseDto[] = [];
    const processedOverlaps = new Set<string>();

    for (let i = 0; i < periods.length; i++) {
      for (let j = i + 1; j < periods.length; j++) {
        const period1 = periods[i];
        const period2 = periods[j];

        if (!period1 || !period2) {
          continue;
        }

        if (
          this.periodsOverlap(
            period1.startDate,
            period1.endDate,
            period2.startDate,
            period2.endDate,
          )
        ) {
          const overlapStart = this.maxDate(
            period1.startDate,
            period2.startDate,
          );
          const overlapEnd = this.minDate(period1.endDate, period2.endDate);
          const overlapKey = `${overlapStart.getTime()}-${overlapEnd.getTime()}`;

          if (!processedOverlaps.has(overlapKey)) {
            processedOverlaps.add(overlapKey);

            const description = this.buildOverlapDescription(period1, period2);

            overlaps.push(
              CnisTimelinePeriodResponseDto.build({
                type: CnisTimelinePeriodTypeEnum.OVERLAP,
                startDate: overlapStart,
                endDate: overlapEnd,
                description,
              }),
            );
          }
        }
      }
    }

    return overlaps;
  }

  private detectGaps(
    sortedPeriods: CnisTimelinePeriodResponseDto[],
  ): CnisTimelinePeriodResponseDto[] {
    const gaps: CnisTimelinePeriodResponseDto[] = [];

    for (let i = 0; i < sortedPeriods.length - 1; i++) {
      const currentPeriod = sortedPeriods[i];
      const nextPeriod = sortedPeriods[i + 1];

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

  private buildOverlapDescription(
    period1: CnisTimelinePeriodResponseDto,
    period2: CnisTimelinePeriodResponseDto,
  ): string {
    const type1Name = this.getPeriodTypeName(period1.type);
    const type2Name = this.getPeriodTypeName(period2.type);

    return `Sobreposição entre ${type1Name} e ${type2Name}`;
  }

  private getPeriodTypeName(type: CnisTimelinePeriodTypeEnum): string {
    switch (type) {
      case CnisTimelinePeriodTypeEnum.RURAL:
        return 'período rural';
      case CnisTimelinePeriodTypeEnum.URBAN:
        return 'período urbano';
      case CnisTimelinePeriodTypeEnum.PENDING:
        return 'período pendente';
      default:
        return 'período';
    }
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

  private addDays(date: Date, days: number): Date {
    const result = new Date(date);
    result.setDate(result.getDate() + days);
    return result;
  }
}
