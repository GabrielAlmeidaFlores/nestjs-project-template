import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionResultId extends Guid {
  protected override readonly _type = DeathBenefitRejectionResultId.name;
}
