import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityGrantLegalProceedingId extends Guid {
  protected override readonly _type = BpcDisabilityGrantLegalProceedingId.name;
}
