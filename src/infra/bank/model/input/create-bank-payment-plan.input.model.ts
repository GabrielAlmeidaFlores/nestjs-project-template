import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { BankPaymentMethodEnum } from '@infra/bank/enum/bank-payment-method.enum';
import type { BankPaymentPlanCycleEnum } from '@infra/bank/enum/bank-payment-plan-cycle.enum';
import type { GetBankCreditCardHolderInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-holder-info.input.model';
import type { GetBankCreditCardInfoInputModel } from '@infra/bank/model/input/get-bank-credit-card-info.input.model';

export class CreateBankPaymentPlanInputModel extends BaseBuildableObject {
  public customerId: string;
  public paymentMethod: BankPaymentMethodEnum;
  public value: DecimalValue;
  public cycle: BankPaymentPlanCycleEnum;
  public description: string;
  public externalReference: string;
  public remoteIp: string;
  public creditCard: GetBankCreditCardInfoInputModel;
  public creditCardHolderInfo: GetBankCreditCardHolderInfoInputModel;
  public discountPercentage: number | null;

  protected override readonly _type = CreateBankPaymentPlanInputModel.name;
}
