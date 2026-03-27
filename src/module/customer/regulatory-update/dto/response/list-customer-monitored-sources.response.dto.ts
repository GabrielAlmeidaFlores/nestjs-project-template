import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class CustomerMonitoredSourceItemResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public url: string;

  @ResponseDtoBooleanProperty()
  public active: boolean;

  protected override readonly _type = CustomerMonitoredSourceItemResponseDto.name;
}

@ResponseDto()
export class ListCustomerMonitoredSourcesResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoObjectProperty(() => CustomerMonitoredSourceItemResponseDto, {
    isArray: true,
  })
  public resource: CustomerMonitoredSourceItemResponseDto[];

  protected override readonly _type =
    ListCustomerMonitoredSourcesResponseDto.name;
}
