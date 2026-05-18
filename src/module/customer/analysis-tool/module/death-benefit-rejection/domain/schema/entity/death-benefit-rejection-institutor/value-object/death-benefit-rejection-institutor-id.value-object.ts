import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionInstitorId extends Guid {
  protected override readonly _type = DeathBenefitRejectionInstitorId.name;
}
