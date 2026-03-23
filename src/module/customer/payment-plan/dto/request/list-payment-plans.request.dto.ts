import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { ListDataRequestDto } from '@shared/api/util/dto/request/list-data.request.dto';

@RequestDto()
export class ListPaymentPlansRequestDto extends ListDataRequestDto {
  @RequestDtoEnumProperty(PaymentPlanCycleEnum, {
    required: false,
    isArray: true,
  })
  public cycles?: PaymentPlanCycleEnum[];

  protected override readonly _type = ListPaymentPlansRequestDto.name;
}
