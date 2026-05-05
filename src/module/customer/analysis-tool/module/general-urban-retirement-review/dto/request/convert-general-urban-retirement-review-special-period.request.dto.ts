import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { GeneralUrbanRetirementReviewSpecialPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-special-period/value-object/general-urban-retirement-review-special-period-id.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class DataConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoValueObjectProperty(GeneralUrbanRetirementReviewId)
  public generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId;

  @RequestDtoValueObjectProperty(GeneralUrbanRetirementReviewSpecialPeriodId)
  public generalUrbanRetirementReviewSpecialPeriodId: GeneralUrbanRetirementReviewSpecialPeriodId;

  protected override readonly _type =
    DataConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto.name;
}

@RequestDto()
export class ConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto extends BaseBuildableDtoObject {
  @RequestDtoObjectProperty(
    () => DataConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto,
  )
  public json: DataConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto;

  protected override readonly _type =
    ConvertGeneralUrbanRetirementReviewSpecialPeriodRequestDto.name;
}
