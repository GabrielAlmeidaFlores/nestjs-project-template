import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class LegalPleadingResultId extends Guid {
  protected override readonly _type = LegalPleadingResultId.name;
}
