import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';
import { InvalidSupportTicketNumberError } from '@module/support/service-desk/domain/schema/entity/support-ticket/value-object/support-ticket-number/error/invalid-support-ticket-number.error';

export class SupportTicketNumber extends BaseValueObject<SupportTicketNumber> {
  private static readonly ticketNumberLength = 8;
  protected readonly _type = SupportTicketNumber.name;

  public constructor(value: number | string) {
    let formattedValue: string;

    if (typeof value === 'number') {
      if (!Number.isInteger(value) || value < 1) {
        throw new InvalidSupportTicketNumberError();
      }

      formattedValue = String(value).padStart(
        SupportTicketNumber.ticketNumberLength,
        '0',
      );
    } else {
      if (!SupportTicketNumber.isValidString(value)) {
        throw new InvalidSupportTicketNumberError();
      }

      formattedValue = value;
    }

    super(formattedValue);
  }

  public static next(
    currentTicketNumber?: SupportTicketNumber | null,
  ): SupportTicketNumber {
    const nextValue = (currentTicketNumber?.toNumber() ?? 0) + 1;
    return new SupportTicketNumber(nextValue);
  }

  private static isValidString(value: string): boolean {
    const regex = new RegExp(
      `^\\d{${SupportTicketNumber.ticketNumberLength}}$`,
    );
    if (!regex.test(value)) {
      return false;
    }

    return parseInt(value, 10) >= 1;
  }

  public equals(other: SupportTicketNumber): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }

  public toNumber(): number {
    return parseInt(this.value, 10);
  }
}
