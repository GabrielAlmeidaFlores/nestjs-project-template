import { Inject, Injectable } from '@nestjs/common';

import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { GetSpecialCategoryRetirementAnalysisRemunerationQueryResult } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis-remuneration/query/result/get-special-category-retirement-analysis-remuneration.query.result';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
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

  private readonly planoRealStartDate = new Date(1994, 6, 1);

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
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

    const months = this.generateMonthRange(this.planoRealStartDate, new Date());
    const remunerationByMonthKey = this.buildRemunerationMap(
      queryResult.remunerations,
    );

    const items: SpecialCategoryRetirementAnalysisRemunerationItemResponseDto[] =
      [];

    for (const monthYear of months) {
      const key = this.monthKey(monthYear);
      const existing = remunerationByMonthKey.get(key) ?? null;

      if (existing !== null) {
        const remunerationDetail =
          existing.remunerationGrossAmount !== null
            ? this.remunerationCalculatorGateway.calculateRemuneration(
                RemunerationDataInputModel.build({
                  remunerationDate: existing.remunerationReferenceMonthYear,
                  remunerationAmount: existing.remunerationGrossAmount,
                }),
              )
            : null;

        items.push(
          SpecialCategoryRetirementAnalysisRemunerationItemResponseDto.build({
            specialCategoryRetirementAnalysisRemunerationId:
              existing.specialCategoryRetirementAnalysisRemunerationId,
            remunerationReferenceMonthYear:
              existing.remunerationReferenceMonthYear,
            ...(existing.remunerationGrossAmount !== null && {
              remunerationGrossAmount: existing.remunerationGrossAmount,
            }),
            ...(remunerationDetail !== null && {
              correctionFactor: remunerationDetail.correctionFactor,
              updatedRemunerationAmount:
                remunerationDetail.updatedRemunerationAmount,
            }),
          }),
        );
      } else {
        items.push(
          SpecialCategoryRetirementAnalysisRemunerationItemResponseDto.build({
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
