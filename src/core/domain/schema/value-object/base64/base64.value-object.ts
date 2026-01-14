import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidBase64Error } from '@core/domain/schema/value-object/base64/error/invalid-base64.error';

export class Base64 extends BaseValueObject<Base64> {
  private static readonly BASE64_BLOCK_SIZE = 4;
  private static readonly MAX_PADDING_LENGTH = 2;

  protected readonly _type = Base64.name;

  public constructor(value: string) {
    super(value);

    const isValidBase64 = Base64.isValid(value);

    if (!isValidBase64) {
      throw new InvalidBase64Error();
    }
  }

  public static encode(value: string): Base64 {
    if (typeof Buffer !== 'undefined') {
      return new Base64(Buffer.from(value, 'utf-8').toString('base64'));
    }
    return new Base64(btoa(value));
  }

  public static encodeBuffer(buffer: Buffer): Base64 {
    return new Base64(buffer.toString('base64'));
  }

  public static isValid(value: string): boolean {
    if (!value || value.trim() === '') {
      return false;
    }

    const base64Regex = /^[A-Za-z0-9+/\-_]+=*$/;

    if (!base64Regex.test(value)) {
      return false;
    }

    const withoutPadding = value.replace(/=+$/, '');
    const paddingLength = value.length - withoutPadding.length;

    if (paddingLength > Base64.MAX_PADDING_LENGTH) {
      return false;
    }

    try {
      const standardBase64 = value.replace(/-/g, '+').replace(/_/g, '/');

      const paddedBase64 = Base64.addPadding(standardBase64);

      if (typeof Buffer !== 'undefined') {
        Buffer.from(paddedBase64, 'base64').toString('utf-8');
      } else {
        atob(paddedBase64);
      }

      return true;
    } catch {
      return false;
    }
  }

  private static addPadding(value: string): string {
    const paddingNeeded =
      (Base64.BASE64_BLOCK_SIZE - (value.length % Base64.BASE64_BLOCK_SIZE)) %
      Base64.BASE64_BLOCK_SIZE;
    return value.padEnd(value.length + paddingNeeded, '=');
  }

  private static normalizeToStandardBase64(value: string): string {
    const standardBase64 = value.replace(/-/g, '+').replace(/_/g, '/');
    return Base64.addPadding(standardBase64);
  }

  public decode(): string {
    const paddedBase64 = Base64.normalizeToStandardBase64(this.value);

    if (typeof Buffer !== 'undefined') {
      return Buffer.from(paddedBase64, 'base64').toString('utf-8');
    }
    return atob(paddedBase64);
  }

  public decodeToBuffer(): Buffer {
    const paddedBase64 = Base64.normalizeToStandardBase64(this.value);
    return Buffer.from(paddedBase64, 'base64');
  }

  public toUrlSafe(): Base64 {
    const urlSafe = this.value.replace(/\+/g, '-').replace(/\//g, '_');
    return new Base64(urlSafe);
  }

  public equals(other: Base64): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  public getBase64SizeInGigabytes(): number {
    const BYTES_PER_KB = 1024;
    const BYTES_PER_MB = BYTES_PER_KB * BYTES_PER_KB;
    const BYTES_PER_GB = BYTES_PER_MB * BYTES_PER_KB;
    const BASE64_CHARS_PER_BLOCK = 4;
    const BASE64_BYTES_PER_BLOCK = 3;

    const paddingLength = (this.value.match(/=+$/) ?? [''])[0].length;
    const sizeInBytes =
      (this.value.length * BASE64_BYTES_PER_BLOCK) / BASE64_CHARS_PER_BLOCK -
      paddingLength;

    return sizeInBytes / BYTES_PER_GB;
  }
}
