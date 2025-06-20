import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankPaymentInputModel {
  public customer: string;
  public billingType: BankPaymentMethodEnum;
  public value: DecimalValue;
  public dueDate: Date;
  public description: string;
  public paymentPlan: Guid;
  public discountPercentage: number;

  protected readonly _type = CreateBankPaymentInputModel.name;

  public constructor(props: PublicPropertyType<CreateBankPaymentInputModel>) {
    this.customer = props.customer;
    this.billingType = props.billingType;
    this.value = props.value;
    this.dueDate = props.dueDate;
    this.description = props.description;
    this.paymentPlan = props.paymentPlan;
    this.discountPercentage = props.discountPercentage;
  }
}
