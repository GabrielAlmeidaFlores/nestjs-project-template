import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementRejectionId extends Guid {
  protected override readonly _type = SpecialRetirementRejectionId.name;
}
