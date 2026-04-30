import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId extends Guid {
  protected override readonly _type =
    TemporaryIncapacityBenefitTerminationDisabilityAnalysisDocumentId.name;
}
