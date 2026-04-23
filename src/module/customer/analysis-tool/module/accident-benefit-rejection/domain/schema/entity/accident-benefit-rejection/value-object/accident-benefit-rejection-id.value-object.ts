import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class AccidentBenefitRejectionId extends Guid {
  protected override readonly _type = AccidentBenefitRejectionId.name;
}
