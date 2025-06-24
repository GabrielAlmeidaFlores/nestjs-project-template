import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { GetBankChargePixInfoOutputModel } from '@infra/bank/model/output/get-bank-charge-pix-info.output.model';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankChargeOutputModel {
  public id: string;
  public customer: string;
  public billingMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public netValue: DecimalValue;
  public dueDate: Date;
  public dateCreated: Date;
  public description: string;
  public paymentPlan: Guid;
  public discountPercentage: number | null;
  public pixInfo: GetBankChargePixInfoOutputModel | null;

  protected readonly _type = CreateBankChargeOutputModel.name;

  public constructor(props: PublicPropertyType<CreateBankChargeOutputModel>) {
    this.id = props.id;
    this.customer = props.customer;
    this.billingMethod = props.billingMethod;
    this.value = props.value;
    this.netValue = props.netValue;
    this.dueDate = props.dueDate;
    this.dateCreated = props.dateCreated;
    this.description = props.description;
    this.paymentPlan = props.paymentPlan;
    this.discountPercentage = props.discountPercentage;
    this.pixInfo = props.pixInfo;
  }
}
