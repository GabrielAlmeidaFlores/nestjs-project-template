import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { GetBankChargePixInfoOutputModel } from '@infra/bank/model/output/get-bank-charge-pix-info.output.model';

export class CreateBankChargeOutputModel extends BaseBuildableObject {
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

  protected override readonly _type = CreateBankChargeOutputModel.name;
}
