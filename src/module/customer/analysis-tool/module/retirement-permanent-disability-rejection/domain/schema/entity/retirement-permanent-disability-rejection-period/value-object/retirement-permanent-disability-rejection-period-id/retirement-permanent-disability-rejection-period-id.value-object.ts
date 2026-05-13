import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RetirementPermanentDisabilityRejectionPeriodId extends Guid {
  protected override readonly _type =
    RetirementPermanentDisabilityRejectionPeriodId.name;
}
