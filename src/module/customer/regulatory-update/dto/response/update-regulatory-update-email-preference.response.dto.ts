import { RegulatoryUpdateEmailPreferenceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-email-preference/value-object/regulatory-update-email-preference-id/regulatory-update-email-preference-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class UpdateRegulatoryUpdateEmailPreferenceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RegulatoryUpdateEmailPreferenceId)
  public regulatoryUpdateEmailPreferenceId: RegulatoryUpdateEmailPreferenceId;

  protected override readonly _type =
    UpdateRegulatoryUpdateEmailPreferenceResponseDto.name;
}
