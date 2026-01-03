import { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import { PaymentPlanPaidResourceTypeEnum } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/enum/payment-plan-paid-resource-type.enum';
import { PaymentPlanPaidResourceId } from '@module/customer/payment-plan/domain/schema/entity/payment-plan-paid-resource/value-object/payment-plan-paid-resource-id/payment-plan-paid-resource-id.value-object';
import { PaymentMethodEnum } from '@module/generic/bank/domain/schema/entity/bank-payment/enum/payment-method.enum';
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
export class EnabledPaidResourceItemDto extends BaseBuildableDtoObject {
  @ResponseDtoValueObjectProperty(PaymentPlanPaidResourceId)
  public id: PaymentPlanPaidResourceId;

  @ResponseDtoEnumProperty(PaymentPlanPaidResourceTypeEnum)
  public resource: PaymentPlanPaidResourceTypeEnum;

  @ResponseDtoNumberProperty()
  public creditCost: number;

  @ResponseDtoStringProperty()
  public description: string;

  protected override readonly _type = EnabledPaidResourceItemDto.name;
}

@ResponseDto()
export class ValidateOrganizationPaymentPlanStatusResponseDto extends BaseBuildableDtoObject {
  @ResponseDtoBooleanProperty()
  public isActive: boolean;

  @ResponseDtoStringProperty({
    required: false,
  })
  public lastPaymentStatus?: string;

  @ResponseDtoDateProperty({
    required: false,
  })
  public lastPaymentDate?: Date;

  @ResponseDtoDateProperty({
    required: false,
  })
  public nextDueDate?: Date;

  @ResponseDtoDateProperty({
    required: false,
  })
  public accessionDate?: Date;

  @ResponseDtoStringProperty()
  public planName: string;

  @ResponseDtoStringProperty()
  public planDescription: string;

  @ResponseDtoValueObjectProperty(DecimalValue)
  public planPrice: DecimalValue;

  @ResponseDtoNumberProperty()
  public maxMemberCount: number;

  @ResponseDtoNumberProperty()
  public monthlyCreditAmount: number;

  @ResponseDtoBooleanProperty()
  public hasOverduePayments: boolean;

  @ResponseDtoNumberProperty()
  public overduePaymentsCount: number;

  @ResponseDtoObjectProperty(() => EnabledPaidResourceItemDto, {
    isArray: true,
  })
  public enabledPaidResources: EnabledPaidResourceItemDto[];

  @ResponseDtoEnumProperty(PaymentMethodEnum, {
    required: false,
  })
  public paymentMethod?: PaymentMethodEnum;

  protected override readonly _type =
    ValidateOrganizationPaymentPlanStatusResponseDto.name;
}
