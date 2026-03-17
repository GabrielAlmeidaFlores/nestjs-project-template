import { Inject, Injectable } from '@nestjs/common';

import { SpecialCategoryRetirementAnalysisId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis/value-object/special-category-retirement-analysis-id/special-category-retirement-analysis-id.value-object';
import { CreateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-remuneration-batch.request.dto';
import { CreateSpecialCategoryRetirementAnalysisRemunerationBatchResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis-remuneration-batch.response.dto';
import { CreateSpecialCategoryRetirementAnalysisRemunerationUseCase } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/use-case/create-special-category-retirement-analysis-remuneration.use-case';
import { OrganizationSessionDataModel } from '@shared/api/util/decorator/property/get-organization-session-data/model/generic/organization-session-data.model';

@Injectable()
export class CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase {
  protected readonly _type =
    CreateSpecialCategoryRetirementAnalysisRemunerationBatchUseCase.name;

  public constructor(
    @Inject(CreateSpecialCategoryRetirementAnalysisRemunerationUseCase)
    private readonly createRemunerationUseCase: CreateSpecialCategoryRetirementAnalysisRemunerationUseCase,
  ) {}

  public async execute(
    organizationSessionData: OrganizationSessionDataModel,
    analysisId: SpecialCategoryRetirementAnalysisId,
    dto: CreateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto,
  ): Promise<CreateSpecialCategoryRetirementAnalysisRemunerationBatchResponseDto> {
    const data = await Promise.all(
      dto.items.map((item) =>
        this.createRemunerationUseCase.execute(
          organizationSessionData,
          analysisId,
          item,
        ),
      ),
    );

    return CreateSpecialCategoryRetirementAnalysisRemunerationBatchResponseDto.build(
      { data },
    );
  }
}

