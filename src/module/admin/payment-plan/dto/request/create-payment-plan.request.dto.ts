import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class CreatePaymentPlanRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public name: string;

  @RequestDtoStringProperty()
  public description: string;

  @RequestDtoValueObjectProperty(DecimalValue)
  public price: DecimalValue;

  @RequestDtoNumberProperty()
  public maxMemberCount: number;

  @RequestDtoNumberProperty()
  public monthlyCreditAmount: number;

  @RequestDtoBooleanProperty()
  public active: boolean;

  @RequestDtoEnumProperty(PaymentPlanCycleEnum)
  public cycle: PaymentPlanCycleEnum;

  @RequestDtoValueObjectProperty(PaymentPlanPaidResourceId, { isArray: true })
  public paidResource: PaymentPlanPaidResourceId[];

  protected override readonly _type = CreatePaymentPlanRequestDto.name;
}
