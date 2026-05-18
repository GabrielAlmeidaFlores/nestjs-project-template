import { MiniAdvisorId } from '@module/customer/mini-advisor/domain/schema/entity/mini-advisor/value-object/mini-advisor-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CreateMiniAdvisorResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(MiniAdvisorId)
  public miniAdvisorId: MiniAdvisorId;

  protected override readonly _type = CreateMiniAdvisorResponseDto.name;
}
