import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { BankPaymentPlanCycleEnum } from '@infra/bank/enum/bank-payment-plan-cycle.enum';

export class CreateBankPaymentPlanOutputModel extends BaseBuildableObject {
  public id: string;
  public customer: string;
  public paymentMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public cycle: BankPaymentPlanCycleEnum;
  public description: string;

  protected override readonly _type = CreateBankPaymentPlanOutputModel.name;
}
