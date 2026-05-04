import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationDisabilityAssessmentDocumentId extends Guid {
  protected override readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentDocumentId.name;
}
