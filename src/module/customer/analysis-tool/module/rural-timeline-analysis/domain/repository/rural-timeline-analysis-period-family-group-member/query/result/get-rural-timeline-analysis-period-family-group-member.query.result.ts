import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { FederalDocument } from '@core/domain/schema/value-object/federal-document/federal-document.value-object';
import type { RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-family-group-member/enum/rural-timeline-analysis-period-family-group-member-kinship-type.enum';

export class GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult extends BaseBuildableObject {
  public readonly name: string;
  public readonly federalDocument: FederalDocument;
  public readonly kinship: RuralTimelineAnalysisPeriodFamilyGroupMemberKinshipTypeEnum;
  public readonly receivesRuralBenefit: boolean;
  public readonly benefitNumber: string | null;
  public readonly cnisDocument: string | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult.name;
}
