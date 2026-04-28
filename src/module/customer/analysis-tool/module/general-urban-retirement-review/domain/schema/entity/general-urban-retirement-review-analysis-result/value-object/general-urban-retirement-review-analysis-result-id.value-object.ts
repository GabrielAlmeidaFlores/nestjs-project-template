import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementReviewAnalysisResultId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementReviewAnalysisResultId.name;
}
