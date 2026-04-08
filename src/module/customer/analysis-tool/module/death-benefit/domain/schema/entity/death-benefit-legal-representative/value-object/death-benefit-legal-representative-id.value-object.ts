import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitLegalRepresentativeId extends Guid {
  protected override readonly _type = DeathBenefitLegalRepresentativeId.name;
}
