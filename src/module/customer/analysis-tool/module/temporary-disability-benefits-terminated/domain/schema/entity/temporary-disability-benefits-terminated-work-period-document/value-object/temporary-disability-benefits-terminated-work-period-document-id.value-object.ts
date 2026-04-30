import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedWorkPeriodDocumentId.name;
}
