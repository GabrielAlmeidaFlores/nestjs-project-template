import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisId.name;
}
