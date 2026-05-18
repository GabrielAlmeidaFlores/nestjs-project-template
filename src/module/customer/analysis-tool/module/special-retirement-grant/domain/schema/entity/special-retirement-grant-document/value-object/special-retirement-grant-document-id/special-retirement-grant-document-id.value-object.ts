import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantDocumentId extends Guid {
  protected override readonly _type = SpecialRetirementGrantDocumentId.name;
}
