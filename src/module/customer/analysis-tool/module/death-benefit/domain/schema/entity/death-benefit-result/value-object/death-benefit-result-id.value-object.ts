import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitResultId extends Guid {
  protected override readonly _type = DeathBenefitResultId.name;
}
