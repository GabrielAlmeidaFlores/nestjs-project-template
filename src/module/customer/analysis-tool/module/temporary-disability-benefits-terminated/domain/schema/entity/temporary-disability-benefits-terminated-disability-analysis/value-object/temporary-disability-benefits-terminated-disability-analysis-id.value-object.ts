import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId extends Guid {
  protected override readonly _type =
    TemporaryDisabilityBenefitsTerminatedDisabilityAnalysisId.name;
}
