import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialActivityLegalProceedingId extends Guid {
  protected override readonly _type = SpecialActivityLegalProceedingId.name;

  public constructor(value?: string) {
    super(value);
  }
}
