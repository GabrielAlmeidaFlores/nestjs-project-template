import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityAssessmentForBpcAnalysisResultId extends Guid {
  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisResultId.name;
}
