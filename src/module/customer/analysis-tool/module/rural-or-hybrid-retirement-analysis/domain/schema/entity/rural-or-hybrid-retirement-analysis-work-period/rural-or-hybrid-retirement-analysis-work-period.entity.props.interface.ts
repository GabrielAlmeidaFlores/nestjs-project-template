import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';
import type { RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/enum/rural-or-hybrid-retirement-analysis-work-period-job-type.enum';
import type { RuralOrHybridRetirementAnalysisWorkPeriodId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-work-period/value-object/rural-or-hybrid-retirement-analysis-work-period-id.value-object';

export interface RuralOrHybridRetirementAnalysisWorkPeriodEntityPropsInterface extends BaseEntityPropsInterface<RuralOrHybridRetirementAnalysisWorkPeriodId> {
  bondOrigin?: string | null;
  startDate?: Date | null;
  endDate?: Date | null;
  category?: string | null;
  competenceBelowTheMinimum?: boolean | null;
  pendencyReason?: string | null;
  periodConsideration?: string | null;
  contributionAverage?: string | null;
  status?: string | null;
  gracePeriod?: string | null;
  jobType?: RuralOrHybridRetirementAnalysisWorkPeriodJobTypeEnum | null;
  activityDescription?: string | null;
  ruralOrHybridRetirementAnalysisId: RuralOrHybridRetirementAnalysisId;
}
