import { CreateSpecialCategoryRetirementAnalysisRemunerationRequestDto } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/dto/request/create-special-category-retirement-analysis-remuneration.request.dto';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => CreateSpecialCategoryRetirementAnalysisRemunerationRequestDto,
    { isArray: true },
  )
  public items: CreateSpecialCategoryRetirementAnalysisRemunerationRequestDto[];

  protected override readonly _type =
    UpdateSpecialCategoryRetirementAnalysisRemunerationBatchRequestDto.name;
}
