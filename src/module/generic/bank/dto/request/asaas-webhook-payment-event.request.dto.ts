import { RequestDto } from '@shared/api/util/decorator/class/dto-specification/request-dto.decorator';
import { RequestDtoBooleanProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-boolean-property/request-dto-boolean-property.decorator';
import { RequestDtoNumberProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-number-property/request-dto-number-property.decorator';
import { RequestDtoObjectProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-object-property/request-dto-object-property.decorator';
import { RequestDtoStringProperty } from '@shared/api/util/decorator/property/dto-property/request/request-dto-string-property/request-dto-string-property.decorator';
import { BaseBuildableDtoObject } from '@shared/api/util/object/base-buildable-dto.object';

@RequestDto()
export class AsaasWebhookDiscountRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty()
  public value: number;

  @RequestDtoStringProperty({ required: false })
  public limitDate?: string;

  @RequestDtoNumberProperty()
  public dueDateLimitDays: number;

  @RequestDtoStringProperty()
  public type: string;

  protected override readonly _type = AsaasWebhookDiscountRequestDto.name;
}

@RequestDto()
export class AsaasWebhookFineRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty()
  public value: number;

  @RequestDtoStringProperty()
  public type: string;

  protected override readonly _type = AsaasWebhookFineRequestDto.name;
}

@RequestDto()
export class AsaasWebhookInterestRequestDto extends BaseBuildableDtoObject {
  @RequestDtoNumberProperty()
  public value: number;

  @RequestDtoStringProperty()
  public type: string;

  protected override readonly _type = AsaasWebhookInterestRequestDto.name;
}

@RequestDto()
export class AsaasWebhookCreditCardRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty({ required: false })
  public creditCardNumber?: string;

  @RequestDtoStringProperty({ required: false })
  public creditCardBrand?: string;

  @RequestDtoStringProperty({ required: false })
  public creditCardToken?: string;

  protected override readonly _type = AsaasWebhookCreditCardRequestDto.name;
}

@RequestDto()
export class AsaasWebhookPaymentRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public object: string;

  @RequestDtoStringProperty()
  public id: string;

  @RequestDtoStringProperty()
  public dateCreated: string;

  @RequestDtoStringProperty()
  public customer: string;

  @RequestDtoStringProperty({ required: false })
  public installment?: string;

  @RequestDtoStringProperty({ required: false })
  public subscription?: string;

  @RequestDtoStringProperty({ required: false })
  public checkoutSession?: string;

  @RequestDtoStringProperty({ required: false })
  public paymentLink?: string;

  @RequestDtoNumberProperty()
  public value: number;

  @RequestDtoNumberProperty()
  public netValue: number;

  @RequestDtoNumberProperty({ required: false })
  public originalValue?: number;

  @RequestDtoNumberProperty({ required: false })
  public interestValue?: number;

  @RequestDtoStringProperty()
  public description: string;

  @RequestDtoStringProperty()
  public billingType: string;

  @RequestDtoStringProperty({ required: false })
  public confirmedDate?: string;

  @RequestDtoObjectProperty(() => AsaasWebhookCreditCardRequestDto, {
    required: false,
  })
  public creditCard?: AsaasWebhookCreditCardRequestDto;

  @RequestDtoStringProperty({ required: false })
  public pixTransaction?: string;

  @RequestDtoStringProperty()
  public status: string;

  @RequestDtoStringProperty()
  public dueDate: string;

  @RequestDtoStringProperty()
  public originalDueDate: string;

  @RequestDtoStringProperty({ required: false })
  public paymentDate?: string;

  @RequestDtoStringProperty({ required: false })
  public clientPaymentDate?: string;

  @RequestDtoNumberProperty({ required: false })
  public installmentNumber?: number;

  @RequestDtoStringProperty()
  public invoiceUrl: string;

  @RequestDtoStringProperty()
  public invoiceNumber: string;

  @RequestDtoStringProperty({ required: false })
  public externalReference?: string;

  @RequestDtoBooleanProperty()
  public deleted: boolean;

  @RequestDtoBooleanProperty()
  public anticipated: boolean;

  @RequestDtoBooleanProperty()
  public anticipable: boolean;

  @RequestDtoStringProperty({ required: false })
  public creditDate?: string;

  @RequestDtoStringProperty({ required: false })
  public estimatedCreditDate?: string;

  @RequestDtoStringProperty({ required: false })
  public transactionReceiptUrl?: string;

  @RequestDtoStringProperty({ required: false })
  public nossoNumero?: string;

  @RequestDtoStringProperty({ required: false })
  public bankSlipUrl?: string;

  @RequestDtoStringProperty({ required: false })
  public lastInvoiceViewedDate?: string;

  @RequestDtoStringProperty({ required: false })
  public lastBankSlipViewedDate?: string;

  @RequestDtoObjectProperty(() => AsaasWebhookDiscountRequestDto, {
    required: false,
  })
  public discount?: AsaasWebhookDiscountRequestDto;

  @RequestDtoObjectProperty(() => AsaasWebhookFineRequestDto, {
    required: false,
  })
  public fine?: AsaasWebhookFineRequestDto;

  @RequestDtoObjectProperty(() => AsaasWebhookInterestRequestDto, {
    required: false,
  })
  public interest?: AsaasWebhookInterestRequestDto;

  @RequestDtoBooleanProperty()
  public postalService: boolean;

  @RequestDtoStringProperty({ required: false })
  public escrow?: string;

  @RequestDtoStringProperty({ required: false })
  public refunds?: string;

  protected override readonly _type = AsaasWebhookPaymentRequestDto.name;
}

@RequestDto()
export class AsaasWebhookPaymentEventRequestDto extends BaseBuildableDtoObject {
  @RequestDtoStringProperty()
  public id: string;

  @RequestDtoStringProperty()
  public event: string;

  @RequestDtoStringProperty()
  public dateCreated: string;

  @RequestDtoObjectProperty(() => AsaasWebhookPaymentRequestDto)
  public payment: AsaasWebhookPaymentRequestDto;

  protected override readonly _type = AsaasWebhookPaymentEventRequestDto.name;
}
