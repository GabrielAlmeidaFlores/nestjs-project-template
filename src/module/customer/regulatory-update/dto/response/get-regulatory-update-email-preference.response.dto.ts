import { RegulatoryUpdateEmailPreferenceSendDayEnum } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/enum/regulatory-update-email-preference-send-day.enum';
import { RegulatoryUpdateEmailPreferenceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/value-object/regulatory-update-email-preference-id/regulatory-update-email-preference-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetRegulatoryUpdateEmailPreferenceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RegulatoryUpdateEmailPreferenceId)
  public regulatoryUpdateEmailPreferenceId: RegulatoryUpdateEmailPreferenceId;

  @ResponseDtoBooleanProperty()
  public emailEnabled: boolean;

  @ResponseDtoNumberProperty({ required: false })
  public sendFrequency: number | null;

  @ResponseDtoEnumProperty(RegulatoryUpdateEmailPreferenceSendDayEnum, { required: false, isArray: true })
  public sendDays: RegulatoryUpdateEmailPreferenceSendDayEnum[] | null;

  protected override readonly _type =
    GetRegulatoryUpdateEmailPreferenceResponseDto.name;
}
