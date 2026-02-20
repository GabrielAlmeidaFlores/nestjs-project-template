import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetRuralTimelineAnalysisCnisContributionPeriodQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period/query/result/get-rural-timeline-analysis-cnis-contribution-period.query.result';
import type { GetRuralTimelineAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-document/query/result/get-rural-timeline-analysis-document.query.result';
import type { GetRuralTimelineAnalysisInssBenefitQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-inss-benefit/query/result/get-rural-timeline-analysis-inss-benefit.query.result';
import type { GetRuralTimelineAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-legal-proceeding/query/result/get-rural-timeline-analysis-legal-proceeding.query.result';
import type { GetRuralTimelineAnalysisPeriodQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period/query/result/get-rural-timeline-analysis-period.query.result';
import type { RuralTimelineAnalysisWorkRegimeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/enum/rural-timeline-work-regime.enum';
import type { RuralTimelineAnalysisId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis/value-object/rural-timeline-analysis-id/rural-timeline-analysis-id.value-object';

export class GetRuralTimelineAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisId;
  public readonly ruralTimelineCompleteAnalysis: string | null;
  public readonly ruralTimelineSimplifiedAnalysis: string | null;
  public readonly ruralTimelinePeriodDocumentAnalysis: string | null;
  public readonly workRegime: RuralTimelineAnalysisWorkRegimeEnum;
  public readonly ruralTimelineAnalysisInssBenefit: GetRuralTimelineAnalysisInssBenefitQueryResult[];
  public readonly ruralTimelineAnalysisLegalProceeding: GetRuralTimelineAnalysisLegalProceedingQueryResult[];
  public readonly ruralTimelineAnalysisPeriod: GetRuralTimelineAnalysisPeriodQueryResult[];
  public readonly ruralTimelineDocument: GetRuralTimelineAnalysisDocumentQueryResult[];
  public readonly ruralTimelineCnisContributionPeriod: GetRuralTimelineAnalysisCnisContributionPeriodQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisWithRelationsQueryResult.name;
}
