import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidFederalDocumentError } from '@core/domain/schema/value-object/federal-document/error/invalid-federal-document.error';

export class FederalDocument extends BaseValueObject<FederalDocument> {
  protected readonly _type = FederalDocument.name;

  public constructor(value: string) {
    if (typeof value === 'undefined') {
      throw new InvalidFederalDocumentError();
    }

    value = value.replace(/\D/g, '');

    super(value);

    const isValidFederalDocument = FederalDocument.isValid(value);

    if (!isValidFederalDocument) {
      throw new InvalidFederalDocumentError();
    }
  }

  public static isValid(value: string): boolean {
    const cpfRegex = /^\d{3}\.\d{3}\.\d{3}\-\d{2}$|^\d{11}$/;
    const cnpjRegex = /^\d{2}\.\d{3}\.\d{3}\/\d{4}\-\d{2}$|^\d{14}$/;

    const isValidFederalDocument =
      cpfRegex.test(value) || cnpjRegex.test(value);

    return isValidFederalDocument;
  }

  public equals(other: FederalDocument): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
