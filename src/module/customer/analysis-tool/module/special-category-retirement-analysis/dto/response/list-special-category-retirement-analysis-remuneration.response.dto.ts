import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { SpecialCategoryRetirementAnalysisRemunerationId } from '@module/customer/analysis-tool/module/special-category-retirement-analysis/domain/schema/entity/special-category-retirement-analysis-remuneration/value-object/special-category-retirement-analysis-remuneration-id/special-category-retirement-analysis-remuneration-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class SpecialCategoryRetirementAnalysisRemunerationItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(
    SpecialCategoryRetirementAnalysisRemunerationId,
    { required: false },
  )
  public specialCategoryRetirementAnalysisRemunerationId?: SpecialCategoryRetirementAnalysisRemunerationId;

  @ResponseDtoDateProperty()
  public remunerationReferenceMonthYear: Date;

  @ResponseDtoValueObjectProperty(DecimalValue, { required: false })
  public remunerationGrossAmount?: DecimalValue;

  @ResponseDtoNumberProperty({ required: false })
  public correctionFactor?: number;

  @ResponseDtoNumberProperty({ required: false })
  public updatedRemunerationAmount?: number;

  protected override readonly _type =
    SpecialCategoryRetirementAnalysisRemunerationItemResponseDto.name;
}

@ResponseDto()
export class ListSpecialCategoryRetirementAnalysisRemunerationResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(
    () => SpecialCategoryRetirementAnalysisRemunerationItemResponseDto,
    { isArray: true },
  )
  public data: SpecialCategoryRetirementAnalysisRemunerationItemResponseDto[];

  protected override readonly _type =
    ListSpecialCategoryRetirementAnalysisRemunerationResponseDto.name;
}
