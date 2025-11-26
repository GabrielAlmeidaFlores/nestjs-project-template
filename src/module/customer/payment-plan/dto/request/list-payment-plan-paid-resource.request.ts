import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListPaymentPlanPaidResourceRequestDto extends ListDataRequestDto {
  @RequestDtoStringProperty({ required: false })
  public searchBy?: string;

  @RequestDtoEnumProperty(PaymentPlanPaidResourceTypeEnum, { required: false })
  public resource?: PaymentPlanPaidResourceTypeEnum;

  protected override readonly _type =
    ListPaymentPlanPaidResourceRequestDto.name;
}
