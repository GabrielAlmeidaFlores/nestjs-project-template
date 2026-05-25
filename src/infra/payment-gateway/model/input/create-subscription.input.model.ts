import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { SubscriptionCycleEnum } from '@infra/payment-gateway/enum/subscription-cycle.enum';
import type { CreditCardHolderInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-holder.input.model';
import type { CreditCardInfoInputModel } from '@infra/payment-gateway/model/input/credit-card-info.input.model';

export class CreateSubscriptionInputModel extends BaseBuildableObject {
  public readonly customerId: string;
  public readonly value: DecimalValue;
  public readonly nextDueDate: Date;
  public readonly cycle: SubscriptionCycleEnum;
  public readonly description: string;
  public readonly externalReference: string;
  public readonly creditCardInfo: CreditCardInfoInputModel;
  public readonly creditCardHolderInfo: CreditCardHolderInfoInputModel;
  public readonly remoteIp: string;

  protected override readonly _type = CreateSubscriptionInputModel.name;
}
