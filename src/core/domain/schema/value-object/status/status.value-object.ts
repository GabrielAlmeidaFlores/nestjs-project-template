import { BaseValueObject } from '@core/domain/schema/value-object/base/base.value-object';

export class Status extends BaseValueObject<Status> {
  protected readonly _type = Status.name;

  public constructor(value: string) {
    super(value);
  }

  public equals(other: Status): boolean {
    return this.value === other.value;
  }

  public toString(): string {
    return this.value;
  }
}
