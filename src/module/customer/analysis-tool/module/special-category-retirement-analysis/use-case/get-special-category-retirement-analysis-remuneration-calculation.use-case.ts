import { Inject, Injectable } from '@nestjs/common';

import { RemunerationDataInputModel } from '@module/customer/analysis-tool/lib/remuneration-calculator/model/input/remuneration-data.input.model';
import { RemunerationCalculatorGateway } from '@module/customer/analysis-tool/lib/remuneration-calculator/remuneration-calculator.gateway';
import { SpecialCategoryRetirementAnalysisQueryRepositoryGateway } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/repository/special-category-retirement-analysis/query/special-category-retirement-analysis.query.repository.gateway';
import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { GetSpecialCategoryRetirementAnalysisRemunerationCalculationResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/get-special-category-retirement-analysis-remuneration-calculation.response.dto';
import { SpecialCategoryRetirementAnalysisNotFoundError } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/error/special-category-retirement-analysis-not-found.error';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class GetSpecialCategoryRetirementAnalysisRemunerationCalculationUseCase {
  protected readonly _type =
    GetSpecialCategoryRetirementAnalysisRemunerationCalculationUseCase.name;

  public constructor(
    @Inject(SpecialCategoryRetirementAnalysisQueryRepositoryGateway)
    private readonly specialCategoryRetirementAnalysisQueryRepositoryGateway: SpecialCategoryRetirementAnalysisQueryRepositoryGateway,
    @Inject(RemunerationCalculatorGateway)
    private readonly remunerationCalculatorGateway: RemunerationCalculatorGateway,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
  ): Promise<GetSpecialCategoryRetirementAnalysisRemunerationCalculationResponseDto> {
    const queryResult =
      await this.specialCategoryRetirementAnalysisQueryRepositoryGateway.findOneByIdAndOrganizationIdWithRelationsOrFail(
        analysisId,
        organizationSessionData.organizationId,
        SpecialCategoryRetirementAnalysisNotFoundError,
      );

    const calculation = this.remunerationCalculatorGateway.calculate(
      queryResult.remunerations.flatMap((remuneration) =>
        remuneration.remunerationGrossAmount !== null
          ? [
              RemunerationDataInputModel.build({
                remunerationDate: remuneration.remunerationReferenceMonthYear,
                remunerationAmount: remuneration.remunerationGrossAmount,
              }),
            ]
          : [],
      ),
    );

    return GetSpecialCategoryRetirementAnalysisRemunerationCalculationResponseDto.build(
      {
        totalCompetencies: calculation.totalCompetencies,
        totalAmount: calculation.totalAmount,
        totalUpdatedAmount: calculation.totalUpdatedAmount,
        averageAmount: calculation.averageAmount,
        averageUpdatedAmount: calculation.averageUpdatedAmount,
        topEightyPercentCompetencies: calculation.topEightyPercentCompetencies,
        bottomTwentyPercentCompetencies:
          calculation.bottomTwentyPercentCompetencies,
        topEightyPercentAverageAmount:
          calculation.topEightyPercentAverageAmount,
        topEightyPercentAverageUpdatedAmount:
          calculation.topEightyPercentAverageUpdatedAmount,
      },
    );
  }
}
