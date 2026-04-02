import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class PurchaseCreditPackResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty()
  public bankPaymentId: string;

  @ResponseDtoStringProperty({ required: false })
  public pixQrCode?: string;

  @ResponseDtoStringProperty({ required: false })
  public pixCopyPaste?: string;

  @ResponseDtoStringProperty({ required: false })
  public bankSlipUrl?: string;

  @ResponseDtoStringProperty({ required: false })
  public bankSlipCode?: string;

  protected override readonly _type = PurchaseCreditPackResponseDto.name;
}
