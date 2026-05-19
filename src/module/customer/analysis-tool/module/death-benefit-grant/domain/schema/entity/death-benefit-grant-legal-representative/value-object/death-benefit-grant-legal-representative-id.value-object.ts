import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantLegalRepresentativeId extends Guid {
  protected override readonly _type =
    DeathBenefitGrantLegalRepresentativeId.name;
}
