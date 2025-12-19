import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GenerateYearlyPaymentBillingResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoStringProperty({
    description: 'ID do pagamento bancário gerado',
  })
  public bankPaymentId: string;

  @ResponseDtoStringProperty({
    description: 'QR Code PIX em Base64',
    required: false,
  })
  public pixQrCode?: string;

  @ResponseDtoStringProperty({
    description: 'Código copia e cola do PIX',
    required: false,
  })
  public pixCopyPaste?: string;

  protected override readonly _type =
    GenerateYearlyPaymentBillingResponseDto.name;
}
