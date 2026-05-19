import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantResultId extends Guid {
  protected override readonly _type = DeathBenefitGrantResultId.name;
}
