import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DeathBenefitRejectionPeriodDocumentId extends Guid {
  protected override readonly _type =
    DeathBenefitRejectionPeriodDocumentId.name;
}
