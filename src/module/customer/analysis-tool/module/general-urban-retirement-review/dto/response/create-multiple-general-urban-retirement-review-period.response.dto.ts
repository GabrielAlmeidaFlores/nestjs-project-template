import { GeneralUrbanRetirementReviewPeriodId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-period/value-object/general-urban-retirement-review-period-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMultipleGeneralUrbanRetirementReviewPeriodResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewPeriodId, {
    isArray: true,
  })
  public generalUrbanRetirementReviewPeriodIds: GeneralUrbanRetirementReviewPeriodId[];

  protected override readonly _type =
    CreateMultipleGeneralUrbanRetirementReviewPeriodResponseDto.name;
}
