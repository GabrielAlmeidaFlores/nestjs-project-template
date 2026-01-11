import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class LegalPleadingHistoryId extends Guid {
  protected override readonly _type = LegalPleadingHistoryId.name;
}
