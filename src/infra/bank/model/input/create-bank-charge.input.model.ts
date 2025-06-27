import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';

export class CreateBankChargeInputModel extends BaseBuildableObject {
  public customerId: string;
  public billingMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public dueDate: Date;
  public description: string;
  public paymentPlan: Guid;
  public discountPercentage: number | null;
  public installmentCount: number | null;

  protected override readonly _type = CreateBankChargeInputModel.name;
}
