import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { PaymentPlanCycleEnum } from '@module/customer/payment-plan/domain/schema/enum/payment-plan-cycle.enum';

export class CreditCardInfoInputModel extends BaseBuildableObject {
  public readonly holderName: string;
  public readonly number: string;
  public readonly expiryMonth: string;
  public readonly expiryYear: string;
  public readonly ccv: string;

  protected override readonly _type = CreditCardInfoInputModel.name;
}

export class CreditCardHolderInfoInputModel extends BaseBuildableObject {
  public readonly name: string;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly postalCode: PostalCode;
  public readonly addressNumber: string;
  public readonly phone: PhoneNumber;

  protected override readonly _type = CreditCardHolderInfoInputModel.name;
}

export class CreateSubscriptionInputModel extends BaseBuildableObject {
  public readonly customerId: string;
  public readonly value: DecimalValue;
  public readonly nextDueDate: Date;
  public readonly cycle: PaymentPlanCycleEnum;
  public readonly description: string;
  public readonly externalReference: string;
  public readonly creditCardInfo: CreditCardInfoInputModel;
  public readonly creditCardHolderInfo: CreditCardHolderInfoInputModel;

  protected override readonly _type = CreateSubscriptionInputModel.name;
}
