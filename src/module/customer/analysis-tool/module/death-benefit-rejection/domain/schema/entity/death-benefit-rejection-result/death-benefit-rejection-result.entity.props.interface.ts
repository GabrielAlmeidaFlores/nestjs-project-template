import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitRejectionResultId } from '@module/customer/analysis-tool/module/death-benefit-rejection/domain/schema/entity/death-benefit-rejection-result/value-object/death-benefit-rejection-result-id.value-object';

export interface DeathBenefitRejectionResultEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitRejectionResultId> {
  deathBenefitRejectionInssDecisionAnalysis?: string | null;
  deathBenefitRejectionFirstAnalysis?: string | null;
  deathBenefitRejectionCompleteAnalysis?: string | null;
  deathBenefitRejectionSimplifiedAnalysis?: string | null;
  deathBenefitRejectionCompleteAnalysisDownload?: string | null;
}
