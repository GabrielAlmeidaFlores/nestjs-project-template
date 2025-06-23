import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { BankPaymentPlanCycleEnum } from '@infra/bank/enum/bank-payment-plan-cycle.enum';
import type { BankCreditCardHolderInfoInputModel } from '@infra/bank/model/input/bank-credit-card-holder-info.input.model';
import type { BankCreditCardInfoInputModel } from '@infra/bank/model/input/bank-credit-card-info.input.model';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankPaymentPlanInputModel {
  public customerId: string;
  public paymentMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public nextDueDate: Date;
  public cycle: BankPaymentPlanCycleEnum;
  public description: string;
  public externalReference: string;
  public maxPayments: number;
  public remoteIp: string;
  public creditCard: BankCreditCardInfoInputModel;
  public creditCardHolderInfo: BankCreditCardHolderInfoInputModel;
  public discountPercentage: number | null;

  protected readonly _type = CreateBankPaymentPlanInputModel.name;

  public constructor(
    props: PublicPropertyType<CreateBankPaymentPlanInputModel>,
  ) {
    this.customerId = props.customerId;
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
