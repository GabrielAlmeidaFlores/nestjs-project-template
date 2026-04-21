import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitRejectionDisabilityAnalysisId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitRejectionDisabilityAnalysisId.name;
}
