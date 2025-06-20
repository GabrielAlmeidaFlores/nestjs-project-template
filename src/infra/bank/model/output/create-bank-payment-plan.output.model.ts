import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { BankSubscriptionCycleEnum } from '@infra/bank/enum/bank-subscription-cycle.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankPaymentPlanOutputModel {
  public id: string;
  public customer: string;
  public paymentMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public nextDueDate: Date;
  public cycle: BankSubscriptionCycleEnum;
  public description: string;

  protected readonly _type = CreateBankPaymentPlanOutputModel.name;

  public constructor(
    props: PublicPropertyType<CreateBankPaymentPlanOutputModel>,
  ) {
    this.id = props.id;
    this.customer = props.customer;
    this.paymentMethod = props.paymentMethod;
    this.value = props.value;
    this.nextDueDate = props.nextDueDate;
    this.cycle = props.cycle;
    this.description = props.description;
  }
}
