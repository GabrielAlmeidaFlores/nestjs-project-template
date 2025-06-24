import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankChargeInputModel {
  public customerId: string;
  public billingMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public dueDate: Date;
  public description: string;
  public paymentPlan: Guid;
  public discountPercentage: number | null;
  public installmentCount: number | null;

  protected readonly _type = CreateBankChargeInputModel.name;

  public constructor(props: PublicPropertyType<CreateBankChargeInputModel>) {
    this.customerId = props.customerId;
    this.billingMethod = props.billingMethod;
    this.value = props.value;
    this.dueDate = props.dueDate;
    this.description = props.description;
    this.paymentPlan = props.paymentPlan;
    this.discountPercentage = props.discountPercentage;
    this.installmentCount = props.installmentCount;
  }
}
