import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialActivityInssBenefitId extends Guid {
  protected override readonly _type = SpecialActivityInssBenefitId.name;

  public constructor(value?: string) {
    super(value);
  }
}
