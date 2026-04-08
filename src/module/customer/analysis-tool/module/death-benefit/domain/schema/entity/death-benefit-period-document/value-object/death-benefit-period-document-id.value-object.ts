import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitPeriodDocumentId extends Guid {
  protected override readonly _type = DeathBenefitPeriodDocumentId.name;
}
