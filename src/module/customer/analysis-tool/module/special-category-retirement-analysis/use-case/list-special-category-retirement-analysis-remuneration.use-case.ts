import { Inject, Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { GetSpecialCategoryRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/result/get-special-category-retirement-analysis-remuneration.query.result';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import {
  ListSpecialCategoryRetirementAnalysisRemunerationResponseDto,
  SpecialCategoryRetirementAnalysisRemunerationItemResponseDto,
} from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/list-special-category-retirement-analysis-remuneration.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class ListSpecialCategoryRetirementAnalysisRemunerationUseCase {
  protected readonly _type =
    ListSpecialCategoryRetirementAnalysisRemunerationUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<ListSpecialCategoryRetirementAnalysisRemunerationResponseDto> {
    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        analysisId,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    if (queryResult.workPeriods.length === 0) {
      return ListSpecialCategoryRetirementAnalysisRemunerationResponseDto.build(
        { data: [] },
      );
    }

    const allStartDates = queryResult.workPeriods.map(
      (wp) => wp.workPeriodStartDate,
    );
    const allEndDates = queryResult.workPeriods.map(
      (wp) => wp.workPeriodEndDate,
    );

    const earliestStart = allStartDates.reduce((min, d) => (d < min ? d : min));
    const latestEnd = allEndDates.reduce((max, d) => (d > max ? d : max));

    const months = this.generateMonthRange(earliestStart, latestEnd);

    const remunerationByMonthKey = this.buildRemunerationMap(
      queryResult.remunerations,
    );

    const items: SpecialCategoryRetirementAnalysisRemunerationItemResponseDto[] =
      [];

    for (const monthYear of months) {
      const key = this.monthKey(monthYear);
      const existing = remunerationByMonthKey.get(key) ?? null;

      if (existing !== null) {
        items.push(
          SpecialCategoryRetirementAnalysisRemunerationItemResponseDto.build({
            specialCategoryRetirementAnalysisRemunerationId:
              existing.specialCategoryRetirementAnalysisRemunerationId,
            remunerationReferenceMonthYear:
              existing.remunerationReferenceMonthYear,
            ...(existing.remunerationGrossAmount !== null && {
              remunerationGrossAmount: existing.remunerationGrossAmount,
            }),
          }),
        );
      } else {
        items.push(
          SpecialCategoryRetirementAnalysisRemunerationItemResponseDto.build({
            specialCategoryRetirementAnalysisRemunerationId:
              new SpecialCategoryRetirementAnalysisRemunerationId(),
            remunerationReferenceMonthYear: monthYear,
          }),
        );
      }
    }

    return ListSpecialCategoryRetirementAnalysisRemunerationResponseDto.build({
      data: items,
    });
  }

  private buildRemunerationMap(
    remunerations: GetSpecialCategoryRetirementAnalysisRemunerationQueryResult[],
  ): Map<string, GetSpecialCategoryRetirementAnalysisRemunerationQueryResult> {
    const map = new Map<
      string,
      GetSpecialCategoryRetirementAnalysisRemunerationQueryResult
    >();
    for (const rem of remunerations) {
      map.set(this.monthKey(rem.remunerationReferenceMonthYear), rem);
    }
    return map;
  }

  private monthKey(date: Date): string {
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`;
  }

  private generateMonthRange(startDate: Date, endDate: Date): Date[] {
    const months: Date[] = [];
    const current = new Date(startDate.getFullYear(), startDate.getMonth(), 1);
    const end = new Date(endDate.getFullYear(), endDate.getMonth(), 1);

    while (current <= end) {
      months.push(new Date(current));
      current.setMonth(current.getMonth() + 1);
    }

    return months;
  }
}
