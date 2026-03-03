import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineCnisContributionPeriodDocumentId extends Guid {
  protected override readonly _type =
    RuralTimelineCnisContributionPeriodDocumentId.name;
}
