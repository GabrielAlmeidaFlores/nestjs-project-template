import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class DisabilityAssessmentForBpcAnalysisDocumentId extends Guid {
  protected override readonly _type =
    DisabilityAssessmentForBpcAnalysisDocumentId.name;
}
