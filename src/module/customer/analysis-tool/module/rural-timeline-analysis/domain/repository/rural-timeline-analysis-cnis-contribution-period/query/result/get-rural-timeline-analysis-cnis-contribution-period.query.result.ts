import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { DecimalValue } from '@core/domain/schema/value-object/decimal/decimal.value-object';
import type { GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-cnis-contribution-period-under-minimum/query/result/get-rural-timeline-analysis-cnis-contribution-period-under-minimum.query.result';
import type { GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-analysis-period-pending-exit-date/query/result/get-rural-timeline-analysis-period-pending-exit-date.query.result';
import type { GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-overdue-contribution/query/result/get-rural-timeline-cnis-contribution-period-overdue-contribution.query.result';
import type { GetRuralTimelineCnisContributionPeriodDocumentQueryResult } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/repository/rural-timeline-cnis-contribution-period-document/query/result/get-rural-timeline-cnis-contribution-period-document.query.result';
import type { ContributionAdjustmentIntentTypeEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/contribution-adjustment-intent-type.enum';
import type { RuralTimelineAnalysisCnisContributionPeriodStatusEnum } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/enum/rural-timeline-analysis-cnis-contribution-period-status.enum';
import type { RuralTimelineAnalysisCnisContributionPeriodId } from '@module/customer/analysis-tool/module/rural-timeline-analysis/domain/schema/entity/rural-timeline-analysis-cnis-contribution-period/value-object/rural-timeline-analysis-cnis-contribution-period-id/rural-timeline-analysis-cnis-contribution-period-id.value-object';

export class GetRuralTimelineAnalysisCnisContributionPeriodQueryResult extends BaseBuildableObject {
  public readonly id: RuralTimelineAnalysisCnisContributionPeriodId;
  public readonly employmentRelationshipSource: string | null;
  public readonly startDate: Date | null;
  public readonly endDate: Date | null;
  public readonly category: string | null;
  public readonly qualifyingPeriod: number | null;
  public readonly status: RuralTimelineAnalysisCnisContributionPeriodStatusEnum | null;
  public readonly averageContributionAmount: DecimalValue | null;
  public readonly contributionAdjustmentIntent: ContributionAdjustmentIntentTypeEnum;
  public readonly externalSupplementationIntent: boolean;
  public readonly shouldConsiderPeriod: boolean;
  public readonly shouldConsiderLastRemunerationAsExitDate: boolean;
  public readonly cnisDocument: string | null;
  public readonly impactAnalysis: string | null;
  public readonly ruralTimelineCnisContributionPeriodUnderMinimum: GetRuralTimelineAnalysisCnisContributionPeriodUnderMinimumQueryResult[];
  public readonly ruralTimelineCnisContributionPeriodPendingExitDate: GetRuralTimelineAnalysisPeriodPendingExitDateQueryResult[];
  public readonly ruralTimelineCnisContributionPeriodOverdueContribution: GetRuralTimelineCnisContributionPeriodOverdueContributionQueryResult[];
  public readonly ruralTimelineCnisContributionPeriodDocument: GetRuralTimelineCnisContributionPeriodDocumentQueryResult[];
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetRuralTimelineAnalysisCnisContributionPeriodQueryResult.name;
}
