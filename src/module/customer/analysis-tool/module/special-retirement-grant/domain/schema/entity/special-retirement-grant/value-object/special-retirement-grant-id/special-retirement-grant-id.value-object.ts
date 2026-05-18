import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantId extends Guid {
  protected override readonly _type = SpecialRetirementGrantId.name;
}
