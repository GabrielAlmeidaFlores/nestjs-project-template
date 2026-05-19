import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantLegalProceedingId extends Guid {
  protected override readonly _type = DeathBenefitGrantLegalProceedingId.name;
}
