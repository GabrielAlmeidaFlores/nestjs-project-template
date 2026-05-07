import { RegulatoryUpdateEmailPreferenceSendDayEnum } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/enum/regulatory-update-email-preference-send-day.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateRegulatoryUpdateEmailPreferenceRequestDto extends BaseBuildableDtoObject {
  @RequestDtoBooleanProperty()
  public emailEnabled: boolean;

  @RequestDtoNumberProperty({ required: false })
  public sendFrequency?: number | null;

  @RequestDtoEnumProperty(RegulatoryUpdateEmailPreferenceSendDayEnum, { required: false, isArray: true })
  public sendDays?: RegulatoryUpdateEmailPreferenceSendDayEnum[] | null;

  protected override readonly _type =
    UpdateRegulatoryUpdateEmailPreferenceRequestDto.name;
}
