import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RegulatoryUpdateEmailPreferenceId extends Guid {
  protected override readonly _type = RegulatoryUpdateEmailPreferenceId.name;
}
