import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionId extends Guid {
  protected override readonly _type = DeathBenefitRejectionId.name;
}
