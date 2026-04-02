import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { SupportAttendantId } from '@module/support/account/domain/schema/entity/support-attendant/value-object/support-attendant-id/support-attendant-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';
import { SupportTypeEnum } from '@shared/system/enum/support-type.enum';

@ResponseDto()
export class GetSupportAttendantResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(SupportAttendantId)
  public supportAttendantId: SupportAttendantId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoValueObjectProperty(Email)
  public email: Email;

  @ResponseDtoEnumProperty(SupportTypeEnum)
  public supportType: SupportTypeEnum;

  @ResponseDtoBooleanProperty()
  public isActive: boolean;

  @ResponseDtoNumberProperty()
  public resolvedTicketsCount: number;

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetSupportAttendantResponseDto.name;
}
