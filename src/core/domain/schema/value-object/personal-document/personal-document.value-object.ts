import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidPersonalDocumentError } from '@core/domain/schema/value-object/personal-document/error/personal-document.error';

export class PersonalDocument extends BaseValueObject<PersonalDocument> {
  protected readonly _type = PersonalDocument.name;

  public constructor(value: string) {
    if (typeof value === 'undefined') {
      throw new InvalidPersonalDocumentError();
    }

    value = value.replace(/\D/g, '');

    super(value);

    const isValidPersonalDocument = PersonalDocument.isValid(value);

    if (!isValidPersonalDocument) {
      throw new InvalidPersonalDocumentError();
    }
  }

  public static isValid(value: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/;

    const isValidPersonalDocument = cpfRegex.test(value);

    return isValidPersonalDocument;
  }

  public equals(other: PersonalDocument): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
