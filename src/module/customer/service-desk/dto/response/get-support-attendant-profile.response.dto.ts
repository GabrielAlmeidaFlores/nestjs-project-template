import { SupportTypeEnum } from '@module/customer/service-desk/domain/schema/entity/support-attendant/enum/support-type.enum';
import { SupportAttendantId } from '@module/customer/service-desk/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetSupportAttendantProfileResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SupportAttendantId)
  public supportAttendantId: SupportAttendantId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public email: string;

  @ResponseDtoEnumProperty(SupportTypeEnum)
  public supportType: SupportTypeEnum;

  protected override readonly _type =
    GetSupportAttendantProfileResponseDto.name;
}
