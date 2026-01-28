import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineCnisContributionPeriodId extends Guid {
  protected override readonly _type =
    RuralTimelineCnisContributionPeriodId.name;
}
