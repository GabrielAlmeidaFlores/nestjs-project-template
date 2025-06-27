import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';

export class CreateBankCustomerOutputModel extends BaseBuildableObject {
  public id: string;
  public name: string;
  public email: Email;
  public phoneNumber: PhoneNumber;
  public federalDocument: FederalDocument;

  protected override readonly _type = CreateBankCustomerOutputModel.name;
}
