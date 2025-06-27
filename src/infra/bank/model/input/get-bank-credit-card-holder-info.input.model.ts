import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';

export class GetBankCreditCardHolderInfoInputModel extends BaseBuildableObject {
  public name: string;
  public email: Email;
  public federalDocument: FederalDocument;
  public postalCode: PostalCode;
  public addressNumber: string;
  public phone: PhoneNumber;

  protected override readonly _type =
    GetBankCreditCardHolderInfoInputModel.name;
}
