import { Inject, Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { WorkPeriodItemTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/enum/work-period-item-type.enum';
import { SpecialTimeRegistrationTypeEnum } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-work-period/enum/special-time-registration-type.enum';
import { GetSpecialCategoryRetirementAnalysisTimelineRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/get-special-category-retirement-analysis-timeline.request.dto';
import {
  GetSpecialCategoryRetirementAnalysisTimelineResponseDto,
  SpecialCategoryRetirementAnalysisTimelineItemResponseDto,
} from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/get-special-category-retirement-analysis-timeline.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-work-period/query/result/get-special-category-retirement-analysis-work-period.query.result';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetSpecialCategoryRetirementAnalysisTimelineUseCase {
  protected readonly _type = GetSpecialCategoryRetirementAnalysisTimelineUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
    filters: GetSpecialCategoryRetirementAnalysisTimelineRequestDto,
  ): Promise<GetSpecialCategoryRetirementAnalysisTimelineResponseDto> {
    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        analysisId,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    let workPeriods = queryResult.workPeriods;

    if (filters.startDate !== undefined) {
      workPeriods = workPeriods.filter(
        (wp) => wp.workPeriodEndDate >= filters.startDate!,
      );
    }

    if (filters.endDate !== undefined) {
      workPeriods = workPeriods.filter(
        (wp) => wp.workPeriodStartDate <= filters.endDate!,
      );
    }

    const items: SpecialCategoryRetirementAnalysisTimelineItemResponseDto[] = [];

    const showSpecialActivity = filters.showSpecialActivity !== false;
    const showCommonActivity = filters.showCommonActivity !== false;
    const showOverlaps = filters.showOverlaps === true;
    const showGaps = filters.showGaps === true;

    for (const wp of workPeriods) {
      const isSpecial =
        wp.specialTimeRegistrationType !== SpecialTimeRegistrationTypeEnum.NAO_E_PERIODO_ESPECIAL;

      if (isSpecial && showSpecialActivity) {
        items.push(
          SpecialCategoryRetirementAnalysisTimelineItemResponseDto.build({
            id: wp.specialCategoryRetirementAnalysisWorkPeriodId.toString(),
            workPeriodItemType: WorkPeriodItemTypeEnum.ATIVIDADE_ESPECIAL,
            displayTitle: wp.jobPositionTitle ?? 'Atividade Especial',
            startDate: wp.workPeriodStartDate,
            endDate: wp.workPeriodEndDate,
            durationDescription: this.computeDurationDescription(
              wp.workPeriodStartDate,
              wp.workPeriodEndDate,
            ),
            ...(wp.careerPathName !== null && { locationDescription: wp.careerPathName }),
            isActivePeriod: true,
          }),
        );
      }

      if (!isSpecial && showCommonActivity) {
        items.push(
          SpecialCategoryRetirementAnalysisTimelineItemResponseDto.build({
            id: wp.specialCategoryRetirementAnalysisWorkPeriodId.toString(),
            workPeriodItemType: WorkPeriodItemTypeEnum.ATIVIDADE_COMUM,
            displayTitle: wp.jobPositionTitle ?? 'Atividade Comum',
            startDate: wp.workPeriodStartDate,
            endDate: wp.workPeriodEndDate,
            durationDescription: this.computeDurationDescription(
              wp.workPeriodStartDate,
              wp.workPeriodEndDate,
            ),
            ...(wp.careerPathName !== null && { locationDescription: wp.careerPathName }),
            isActivePeriod: true,
          }),
        );
      }
    }

    if (showOverlaps) {
      const overlapItems = this.findOverlaps(workPeriods);
      items.push(...overlapItems);
    }

    if (showGaps) {
      const gapItems = this.findGaps(workPeriods);
      items.push(...gapItems);
    }

    items.sort((a, b) => a.startDate.getTime() - b.startDate.getTime());

    return GetSpecialCategoryRetirementAnalysisTimelineResponseDto.build({
      data: items,
    });
  }

  private computeDurationDescription(startDate: Date, endDate: Date): string {
    const totalMonths =
      (endDate.getFullYear() - startDate.getFullYear()) * 12 +
      (endDate.getMonth() - startDate.getMonth());

    const years = Math.floor(totalMonths / 12);
    const months = totalMonths % 12;

    if (years === 0 && months === 0) {
      return 'Menos de 1 mês';
    }

    const parts: string[] = [];

    if (years > 0) {
      parts.push(years === 1 ? '1 ano' : `${years} anos`);
    }

    if (months > 0) {
      parts.push(months === 1 ? '1 mês' : `${months} meses`);
    }

    return parts.join(' e ');
  }

  private findOverlaps(
    workPeriods: GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult[],
  ): SpecialCategoryRetirementAnalysisTimelineItemResponseDto[] {
    const overlaps: SpecialCategoryRetirementAnalysisTimelineItemResponseDto[] = [];

    for (let i = 0; i < workPeriods.length; i++) {
      for (let j = i + 1; j < workPeriods.length; j++) {
        const a = workPeriods[i]!;
        const b = workPeriods[j]!;

        const overlapStart =
          a.workPeriodStartDate > b.workPeriodStartDate
            ? a.workPeriodStartDate
            : b.workPeriodStartDate;
        const overlapEnd =
          a.workPeriodEndDate < b.workPeriodEndDate ? a.workPeriodEndDate : b.workPeriodEndDate;

        if (overlapStart < overlapEnd) {
          overlaps.push(
            SpecialCategoryRetirementAnalysisTimelineItemResponseDto.build({
              id: `overlap_${a.specialCategoryRetirementAnalysisWorkPeriodId.toString()}_${b.specialCategoryRetirementAnalysisWorkPeriodId.toString()}`,
              workPeriodItemType: WorkPeriodItemTypeEnum.SOBREPOSICAO,
              displayTitle: 'Sobreposição',
              startDate: overlapStart,
              endDate: overlapEnd,
              durationDescription: this.computeDurationDescription(overlapStart, overlapEnd),
              isActivePeriod: false,
            }),
          );
        }
      }
    }

    return overlaps;
  }

  private findGaps(
    workPeriods: GetSpecialCategoryRetirementAnalysisWorkPeriodQueryResult[],
  ): SpecialCategoryRetirementAnalysisTimelineItemResponseDto[] {
    if (workPeriods.length < 2) {
      return [];
    }

    const sorted = [...workPeriods].sort(
      (a, b) => a.workPeriodStartDate.getTime() - b.workPeriodStartDate.getTime(),
    );

    const gaps: SpecialCategoryRetirementAnalysisTimelineItemResponseDto[] = [];

    for (let i = 0; i < sorted.length - 1; i++) {
      const current = sorted[i]!;
      const next = sorted[i + 1]!;

      if (current.workPeriodEndDate < next.workPeriodStartDate) {
        gaps.push(
          SpecialCategoryRetirementAnalysisTimelineItemResponseDto.build({
            id: `gap_${i}`,
            workPeriodItemType: WorkPeriodItemTypeEnum.LACUNA,
            displayTitle: 'Lacuna',
            startDate: current.workPeriodEndDate,
            endDate: next.workPeriodStartDate,
            durationDescription: this.computeDurationDescription(
              current.workPeriodEndDate,
              next.workPeriodStartDate,
            ),
            isActivePeriod: false,
          }),
        );
      }
    }

    return gaps;
  }
}
