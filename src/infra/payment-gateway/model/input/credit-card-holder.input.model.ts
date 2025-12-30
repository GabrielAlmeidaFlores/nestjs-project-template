import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';

export class CreditCardHolderInfoInputModel extends BaseBuildableObject {
  public readonly name: string;
  public readonly email: Email;
  public readonly federalDocument: FederalDocument;
  public readonly postalCode: PostalCode;
  public readonly addressNumber: string;
  public readonly phone: PhoneNumber;

  protected override readonly _type = CreditCardHolderInfoInputModel.name;
}
