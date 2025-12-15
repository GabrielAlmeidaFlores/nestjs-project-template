import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-enum-property/request-dto-enum-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { RequestDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-value-object-property/request-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class UpdatePaymentPlanRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public name?: string;

  @RequestDtoStringProperty({ required: false })
  public description?: string;

  @RequestDtoValueObjectProperty(DecimalValue, { required: false })
  public price?: DecimalValue;

  @RequestDtoNumberProperty({ required: false })
  public maxMemberCount?: number;

  @RequestDtoNumberProperty({ required: false })
  public monthlyCreditAmount?: number;

  @RequestDtoBooleanProperty({ required: false })
  public active?: boolean;

  @RequestDtoEnumProperty(PaymentPlanCycleEnum, { required: false })
  public cycle?: PaymentPlanCycleEnum;

  protected override readonly _type = UpdatePaymentPlanRequestDto.name;
}
