import { Guid } from '@core/domain/schema/value-object/guid/guid.value-object';

export class RuralTimelineAnalysisPeriodFamilyGroupMemberId extends Guid {
  protected override readonly _type =
    RuralTimelineAnalysisPeriodFamilyGroupMemberId.name;
}
