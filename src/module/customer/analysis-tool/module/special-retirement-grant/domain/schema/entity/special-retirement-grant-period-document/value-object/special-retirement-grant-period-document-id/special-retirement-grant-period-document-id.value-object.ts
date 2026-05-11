import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class SpecialRetirementGrantPeriodDocumentId extends Guid {
  protected override readonly _type =
    SpecialRetirementGrantPeriodDocumentId.name;
}
