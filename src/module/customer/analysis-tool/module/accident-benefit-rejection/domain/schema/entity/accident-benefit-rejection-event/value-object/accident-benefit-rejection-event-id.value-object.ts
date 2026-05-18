import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentBenefitRejectionEventId extends Guid {
  protected override readonly _type = AccidentBenefitRejectionEventId.name;
}
