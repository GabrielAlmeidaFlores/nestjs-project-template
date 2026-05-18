import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitGrantPeriodDocumentId extends Guid {
  protected override readonly _type = DeathBenefitGrantPeriodDocumentId.name;
}
