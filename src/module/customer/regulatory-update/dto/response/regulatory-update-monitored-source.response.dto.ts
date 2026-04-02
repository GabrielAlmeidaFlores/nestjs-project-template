import { RegulatoryUpdateMonitoredSourceId } from '@module/customer/regulatory-update/domain/schema/entity/regulatory-update-monitored-source/value-object/regulatory-update-monitored-source-id/regulatory-update-monitored-source-id.value-object';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class RegulatoryUpdateMonitoredSourceResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(RegulatoryUpdateMonitoredSourceId)
  public regulatoryUpdateMonitoredSourceId: RegulatoryUpdateMonitoredSourceId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoBooleanProperty()
  public active: boolean;

  protected override readonly _type =
    RegulatoryUpdateMonitoredSourceResponseDto.name;
}
