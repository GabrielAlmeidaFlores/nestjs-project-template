import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';

export class CreateCustomerInputModel extends BaseBuildableObject {
  public readonly name: string;
  public readonly email: Email;
  public readonly phoneNumber: PhoneNumber;
  public readonly federalDocument: FederalDocument;
  public readonly externalReference: string;

  protected override readonly _type = CreateCustomerInputModel.name;
}
