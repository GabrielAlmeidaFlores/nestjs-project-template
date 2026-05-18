import { BaseEntity } from '@core/domain/schema/entity/base/base.entity';
import { RuralOrHybridRetirementAnalysisId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/value-object/rural-or-hybrid-retirement-analysis-id.value-object';

import type { RuralOrHybridRetirementAnalysisActivityTypeEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-activity-type.enum';
import type { RuralOrHybridRetirementAnalysisRequestedBenefitEnum } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/enum/rural-or-hybrid-retirement-analysis-requested-benefit.enum';
import type { RuralOrHybridRetirementAnalysisEntityPropsInterface } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis/rural-or-hybrid-retirement-analysis.entity.props.interface';
import type { RuralOrHybridRetirementAnalysisResultId } from '@module/customer/analysis-tool/module/rural-or-hybrid-retirement-analysis/domain/schema/entity/rural-or-hybrid-retirement-analysis-result/value-object/rural-or-hybrid-retirement-analysis-result-id.value-object';

export class RuralOrHybridRetirementAnalysisEntity extends BaseEntity<RuralOrHybridRetirementAnalysisId> {
  public readonly analysisName: string | null;
  public readonly activityType: RuralOrHybridRetirementAnalysisActivityTypeEnum | null;
  public readonly requestedBenefit: RuralOrHybridRetirementAnalysisRequestedBenefitEnum | null;
  public readonly ruralOrHybridRetirementAnalysisResultId: RuralOrHybridRetirementAnalysisResultId | null;

  protected readonly _type = RuralOrHybridRetirementAnalysisEntity.name;

  public constructor(
    props: RuralOrHybridRetirementAnalysisEntityPropsInterface,
  ) {
    super(RuralOrHybridRetirementAnalysisId, props);
    this.analysisName = props.analysisName ?? null;
    this.activityType = props.activityType ?? null;
    this.requestedBenefit = props.requestedBenefit ?? null;
    this.ruralOrHybridRetirementAnalysisResultId =
      props.ruralOrHybridRetirementAnalysisResultId ?? null;
  }
}
