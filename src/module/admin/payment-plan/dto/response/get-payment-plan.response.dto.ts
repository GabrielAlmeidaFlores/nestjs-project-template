import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanEnabledPaidResourceItemResponseDto } from '@module/admin/payment-plan/dto/response/payment-plan-enabled-paid-resource-item.response.dto';
import { PaymentPlanId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan/value-object/payment-plan-id/payment-plan-id.value-object';
import { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';
import { ResponseDto } from '@shared/api/util/decorator/class/dto-specification/response-dto.decorator';
import { ResponseDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-boolean-property/response-dto-boolean-property.decorator';
import { ResponseDtoDateProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-date-property/response-dto-date-property.decorator';
import { ResponseDtoEnumProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-enum-property/response-dto-enum-property.decorator';
import { ResponseDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-number-property/response-dto-number-property.decorator';
import { ResponseDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-object-property/response-dto-object-property.decorator';
import { ResponseDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-string-property/response-dto-string-property.decorator';
import { ResponseDtoValueObjectProperty } from '@shared/api/util/decorator/property/dto-property/response/response-dto-value-object-property/response-dto-value-object-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@ResponseDto()
export class GetPaymentPlanResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PaymentPlanId)
  public id: PaymentPlanId;

  @ResponseDtoStringProperty()
  public name: string;

  @ResponseDtoStringProperty()
  public description: string;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public price: DecimalValue;

  @ResponseDtoNumberProperty()
  public maxMemberCount: number;

  @ResponseDtoNumberProperty()
  public monthlyCreditAmount: number;

  @ResponseDtoBooleanProperty()
  public active: boolean;

  @ResponseDtoEnumProperty(PaymentPlanCycleEnum)
  public cycle: PaymentPlanCycleEnum;

  @ResponseDtoObjectProperty(
    () => PaymentPlanEnabledPaidResourceItemResponseDto,
    {
      isArray: true,
    },
  )
  public enabledPaidResources: PaymentPlanEnabledPaidResourceItemResponseDto[];

  @ResponseDtoDateProperty()
  public createdAt: Date;

  @ResponseDtoDateProperty()
  public updatedAt: Date;

  protected override readonly _type = GetPaymentPlanResponseDto.name;
}
