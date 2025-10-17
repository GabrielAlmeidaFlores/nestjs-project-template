import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetCustomerTermsAcceptanceDataResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public content: string;

  @ResponseDtoBooleanProperty()
  public accepted: boolean;

  protected override readonly _type =
    GetCustomerTermsAcceptanceDataResponseDto.name;
}
