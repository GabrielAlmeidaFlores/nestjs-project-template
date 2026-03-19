import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { Email } from '@core/domain/schema/value-object/email/email.value-object';
import { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import { PhoneNumber } from '@core/domain/schema/value-object/phone-number/phone-number.value-object';
import { PixAddressKeyTypeEnum } from '@module/customer/affiliate-customer/domain/schema/entity/affiliate-customer/enum/pix-address-key-type.enum';
import { InvalidPixAddressKeyError } from '@module/customer/affiliate-customer/domain/schema/value-object/pix-address-key/error/invalid-pix-address-key.error';

export class PixAddressKey extends BaseValueObject<PixAddressKey> {
  protected readonly _type = PixAddressKey.name;

  public constructor(value: string, type: PixAddressKeyTypeEnum) {
    super(value);

    const isValid = PixAddressKey.isValid(value, type);

    if (!isValid) {
      throw new InvalidPixAddressKeyError(type);
    }
  }

  public static isValid(value: string, type: PixAddressKeyTypeEnum): boolean {
    switch (type) {
      case PixAddressKeyTypeEnum.CPF:
      case PixAddressKeyTypeEnum.CNPJ:
        return FederalDocument.isValid(value.replace(/\D/g, ''));

      case PixAddressKeyTypeEnum.EMAIL:
        return Email.isValid(value);

      case PixAddressKeyTypeEnum.PHONE:
        return PhoneNumber.isValid(value.replace(/\D/g, ''));

      case PixAddressKeyTypeEnum.RANDOM:
        return PixAddressKey.isValidRandomKey(value);
    }
  }

  private static isValidRandomKey(value: string): boolean {
    const uuidRegex =
      /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
    return uuidRegex.test(value);
  }

  public equals(other: PixAddressKey): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
