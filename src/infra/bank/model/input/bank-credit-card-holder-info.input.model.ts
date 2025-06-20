import type { Email } from '@core/domain/schema/value-object/email/email.value-object';
import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import type { PostalCode } from '@core/domain/schema/value-object/postal-code/postal-code.value-object';
import type { PublicPropertyType } from '@shared/system/type/public-property.type';

export class BankCreditCardHolderInfoInputModel {
  public name: string;
  public email: Email;
  public federalDocument: FederalDocument;
  public postalCode: PostalCode;
  public addressNumber: string;
  public phone: PhoneNumber;

  protected readonly _type = BankCreditCardHolderInfoInputModel.name;

  public constructor(
    props: PublicPropertyType<BankCreditCardHolderInfoInputModel>,
  ) {
    this.name = props.name;
    this.email = props.email;
    this.federalDocument = props.federalDocument;
    this.postalCode = props.postalCode;
    this.addressNumber = props.addressNumber;
    this.phone = props.phone;
  }
}
