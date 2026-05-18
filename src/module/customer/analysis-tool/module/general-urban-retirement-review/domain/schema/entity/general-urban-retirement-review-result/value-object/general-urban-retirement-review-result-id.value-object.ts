import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementReviewResultId extends Guid {
  protected override readonly _type = GeneralUrbanRetirementReviewResultId.name;
}
