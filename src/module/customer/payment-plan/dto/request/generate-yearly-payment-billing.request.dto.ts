import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class GenerateYearlyPaymentBillingRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ description: 'ID do plano de pagamento' })
  public paymentPlanId: string;

  @RequestDtoNumberProperty({
    description: 'Número de parcelas',
  })
  public installments: number;

  protected override readonly _type =
    GenerateYearlyPaymentBillingRequestDto.name;
}
