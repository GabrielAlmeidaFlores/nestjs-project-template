import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CalculateMessageCreditCostRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty()
  public message: string;

  @RequestDtoEnumProperty(PaymentPlanPaidResourceTypeEnum)
  public paymentPlanPaidResourceType: PaymentPlanPaidResourceTypeEnum;

  protected override readonly _type = CalculateMessageCreditCostRequestDto.name;
}
