import { SpecialCategoryRetirementAnalysisPeriodDocumentId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-period-document/value-object/special-category-retirement-analysis-period-document-id/special-category-retirement-analysis-period-document-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialCategoryRetirementAnalysisPeriodDocumentId)
  public specialCategoryRetirementAnalysisPeriodDocumentId: SpecialCategoryRetirementAnalysisPeriodDocumentId;

  protected override readonly _type =
    AddSpecialCategoryRetirementAnalysisPeriodDocumentResponseDto.name;
}
