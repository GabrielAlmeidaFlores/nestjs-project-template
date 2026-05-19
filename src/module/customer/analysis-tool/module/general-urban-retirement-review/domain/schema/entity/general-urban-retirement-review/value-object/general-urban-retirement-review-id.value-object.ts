import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementReviewId extends Guid {
  protected override readonly _type = GeneralUrbanRetirementReviewId.name;
}
