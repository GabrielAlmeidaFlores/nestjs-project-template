import { GeneralUrbanRetirementReviewId } from '@module/customer/analysis-tool/module/general-urban-retirement-review/domain/schema/entity/general-urban-retirement-review/value-object/general-urban-retirement-review-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateGeneralUrbanRetirementReviewResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(GeneralUrbanRetirementReviewId)
  public generalUrbanRetirementReviewId: GeneralUrbanRetirementReviewId;

  protected override readonly _type =
    CreateGeneralUrbanRetirementReviewResponseDto.name;
}
