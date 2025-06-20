import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class CreateBankCustomerInputModel {
  public name: string;
  public email: Email;
  public phoneNumber: PhoneNumber;
  public federalDocument: FederalDocument;

  protected readonly _type = CreateBankCustomerInputModel.name;

  public constructor(props: PublicPropertyType<CreateBankCustomerInputModel>) {
    this.name = props.name;
    this.email = props.email;
    this.phoneNumber = props.phoneNumber;
    this.federalDocument = props.federalDocument;
  }
}
