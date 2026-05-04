import { GeneralUrbanRetirementReviewTimeAcceleratorId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review-time-accelerator/value-object/general-urban-retirement-review-time-accelerator-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewTimeAcceleratorId)
  public generalUrbanRetirementReviewTimeAcceleratorId: GeneralUrbanRetirementReviewTimeAcceleratorId;

  protected override readonly _type =
    CreateGeneralUrbanRetirementReviewTimeAcceleratorResponseDto.name;
}
