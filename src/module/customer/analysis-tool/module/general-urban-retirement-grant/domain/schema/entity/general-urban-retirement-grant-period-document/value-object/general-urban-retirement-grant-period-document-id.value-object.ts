import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class GeneralUrbanRetirementGrantPeriodDocumentId extends Guid {
  protected override readonly _type =
    GeneralUrbanRetirementGrantPeriodDocumentId.name;
}
