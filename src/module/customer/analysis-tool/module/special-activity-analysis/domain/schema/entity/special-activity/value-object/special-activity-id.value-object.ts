import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialActivityId extends Guid {
  protected override readonly _type = SpecialActivityId.name;

  public constructor(value?: string) {
    super(value);
  }
}
