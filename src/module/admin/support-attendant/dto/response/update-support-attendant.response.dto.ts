import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateSupportAttendantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SupportAttendantId)
  public supportAttendantId: SupportAttendantId;

  protected override readonly _type = UpdateSupportAttendantResponseDto.name;
}
