import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionLegalProceedingId extends Guid {
  protected override readonly _type =
    DeathBenefitRejectionLegalProceedingId.name;
}
