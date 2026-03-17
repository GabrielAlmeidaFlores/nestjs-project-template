import { CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/response/create-special-category-retirement-analysis-work-period.response.dto';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto,
    { isArray: true },
  )
  public data: CreateSpecialCategoryRetirementAnalysisWorkPeriodResponseDto[];

  protected override readonly _type =
    CreateSpecialCategoryRetirementAnalysisWorkPeriodBatchResponseDto.name;
}
