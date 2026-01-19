import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListPaymentPlanPaidResourcesRequestDto extends ListDataRequestDto {
  @RequestDtoEnumProperty(PaymentPlanPaidResourceTypeEnum, {
    isArray: true,
    description: 'Tipos de recursos pagos',
    required: false,
  })
  public resources?: Array<PaymentPlanPaidResourceTypeEnum>;

  protected override readonly _type =
    ListPaymentPlanPaidResourcesRequestDto.name;
}
