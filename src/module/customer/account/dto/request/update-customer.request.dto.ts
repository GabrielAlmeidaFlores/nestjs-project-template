import { StateCodeEnum } from '@core/domain/schema/enum/state-code.enum';
import { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdateCustomerAddressRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public city?: string;

  @RequestDtoStringProperty({ required: false })
  public neighborhood?: string;

  @RequestDtoStringProperty({ required: false })
  public street?: string;

  @RequestDtoEnumProperty(StateCodeEnum, { required: false })
  public stateCode?: StateCodeEnum;

  @RequestDtoValueObjectProperty(PostalCode, { required: false })
  public postalCode?: PostalCode;

  @RequestDtoNumberProperty({ required: false })
  public addressNumber?: number;

  protected override readonly _type = UpdateCustomerAddressRequestDto.name;
}

@RequestDto()
export class UpdateCustomerRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public inssPassword?: string;

  @RequestDtoObjectProperty(() => UpdateCustomerAddressRequestDto, {
    required: false,
  })
  public customerAddress?: UpdateCustomerAddressRequestDto;

  protected override readonly _type = UpdateCustomerRequestDto.name;
}
