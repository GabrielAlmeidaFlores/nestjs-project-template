import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementReviewDocumentId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementReviewDocumentId.name;
}
