import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class BpcDisabilityTerminationDisabilityAssessmentId extends Guid {
  protected override readonly _type =
    BpcDisabilityTerminationDisabilityAssessmentId.name;
}
