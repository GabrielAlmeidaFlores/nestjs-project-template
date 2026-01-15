import { SpecialActivityId } from '@module/customer/analysis-tool/domain/schema/entity/special-activity/value-object/special-activity-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateSpecialActivityResultResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SpecialActivityId)
  public specialActivityId: SpecialActivityId;

  @ResponseDtoObjectProperty(() => Object, { required: false })
  public specialActivityCompleteAnalysis?: object;

  protected override readonly _type =
    CreateSpecialActivityResultResponseDto.name;
}
