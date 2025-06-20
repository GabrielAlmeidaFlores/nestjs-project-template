import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { BankSubscriptionCycleEnum } from '@infra/bank/enum/bank-subscription-cycle.enum';
import type { BankCreditCardHolderInfoInputModel } from '@infra/bank/model/input/bank-credit-card-holder-info.input.model';
import type { BankCreditCardInfoInputModel } from '@infra/bank/model/input/bank-credit-card-info.input.model';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankPaymentPlanInputModel {
  public customer: string;
  public paymentMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public nextDueDate: Date;
  public cycle: BankSubscriptionCycleEnum;
  public description: string;
  public externalReference: string;
  public maxPayments: number;
  public remoteIp: string;
  public creditCard: BankCreditCardInfoInputModel;
  public creditCardHolderInfo: BankCreditCardHolderInfoInputModel;
  public discountPercentage: number;

  protected readonly _type = CreateBankPaymentPlanInputModel.name;

  public constructor(
    props: PublicPropertyType<CreateBankPaymentPlanInputModel>,
  ) {
    this.customer = props.customer;
    this.paymentMethod = props.paymentMethod;
    this.value = props.value;
    this.nextDueDate = props.nextDueDate;
    this.cycle = props.cycle;
    this.description = props.description;
    this.externalReference = props.externalReference;
    this.maxPayments = props.maxPayments;
    this.remoteIp = props.remoteIp;
    this.creditCard = props.creditCard;
    this.creditCardHolderInfo = props.creditCardHolderInfo;
    this.discountPercentage = props.discountPercentage;
  }
}
