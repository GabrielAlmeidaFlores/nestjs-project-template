import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetRuralTimelineAnalysisPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-document/query/result/get-rural-timeline-analysis-period-document.query.result';
import type { GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-economic-aspects/query/result/get-rural-timeline-analysis-period-economic-aspects.query.result';
import type { GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-family-group-member/query/result/get-rural-timeline-analysis-period-family-group-member.query.result';
import type { GetRuralTimelineAnalysisPeriodPropertyQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-property/query/result/get-rural-timeline-analysis-period-property.query.result';
import type { GetRuralTimelineAnalysisPeriodResidenceQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-residence/query/result/get-rural-timeline-analysis-period-residence.query.result';
import type { ProductionDestinationEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/production-destination.enum';
import type { RuralTimelineAnalysisPeriodWorkRegimeTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-work-regime-type.enum';
import type { RuralTimelineAnalysisPeriodWorkerTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/enum/rural-timeline-analysis-period-worker-type.enum';
import type { RuralTimelineAnalysisPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-period/value-object/rural-timeline-analysis-period-id/rural-timeline-analysis-period-id.value-object';

export class GetRuralTimelineAnalysisPeriodQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisPeriodId;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly workerType: RuralTimelineAnalysisPeriodWorkerTypeEnum | null;
  public readonly workRegimeType: RuralTimelineAnalysisPeriodWorkRegimeTypeEnum | null;
  public readonly productionDestination: ProductionDestinationEnum | null;
  public readonly documentAnalysis: string | null;
  public readonly ruralTimelineAnalysisPeriodDocument: GetRuralTimelineAnalysisPeriodDocumentQueryResult[];
  public readonly ruralTimelineAnalysisPeriodResidence: GetRuralTimelineAnalysisPeriodResidenceQueryResult | null;
  public readonly ruralTimelineAnalysisPeriodProperty: GetRuralTimelineAnalysisPeriodPropertyQueryResult | null;
  public readonly ruralTimelineAnalysisPeriodEconomicAspects: GetRuralTimelineAnalysisPeriodEconomicAspectsQueryResult[];
  public readonly ruralTimelineAnalysisPeriodFamilyGroupMember: GetRuralTimelineAnalysisPeriodFamilyGroupMemberQueryResult[];

  protected override readonly _type =
    GetRuralTimelineAnalysisPeriodQueryResult.name;
}
