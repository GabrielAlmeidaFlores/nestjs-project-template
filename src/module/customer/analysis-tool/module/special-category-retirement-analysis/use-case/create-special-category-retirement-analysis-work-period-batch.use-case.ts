import { Inject, Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-work-period-batch.request.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis-work-period-batch.response.dto';
import { CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-work-period.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase {
  protected readonly _type =
    CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchUseCase.name;

  public constructor(
    @Inject(CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase)
    private readonly createWorkPeriodUseCase: CreateSpecialCategoryRetirementAnalysisWorkPeriodUseCase,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
    dto: CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchRequestDto,
  ): Promise<CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto> {
    const data = await Promise.all(
      dto.items.map((item) =>
        this.createWorkPeriodUseCase.execute(
          organizationSessionData,
          analysisId,
          item,
        ),
      ),
    );

    return CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto.build(
      { data },
    );
  }
}
