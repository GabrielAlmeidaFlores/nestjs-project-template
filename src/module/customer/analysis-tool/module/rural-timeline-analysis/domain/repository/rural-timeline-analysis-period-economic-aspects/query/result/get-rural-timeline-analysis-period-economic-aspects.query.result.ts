import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { RuralTimelineAnalysisPeriodEconomicAspectTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period-economic-aspects/enum/rural-timeline-analysis-period-economic-aspect-type.enum';

export class GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult extends BaseBuildableObject {
  public readonly type: RuralTimelineAnalysisPeriodEconomicAspectTypeEnum;
  public readonly content: string | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult.name;
}
