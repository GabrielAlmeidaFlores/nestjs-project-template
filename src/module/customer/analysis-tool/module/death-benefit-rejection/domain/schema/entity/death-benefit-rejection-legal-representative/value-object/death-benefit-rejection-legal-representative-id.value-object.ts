import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionLegalRepresentativeId extends Guid {
  protected override readonly _type =
    DeathBenefitRejectionLegalRepresentativeId.name;
}
