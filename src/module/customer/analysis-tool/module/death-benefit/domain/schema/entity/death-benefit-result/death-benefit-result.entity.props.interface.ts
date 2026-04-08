import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitResultId } from '@module/customer/analysis-tool/module/death-benefit/domain/schema/entity/death-benefit-result/value-object/death-benefit-result-id.value-object';

export interface DeathBenefitResultEntityPropsInterface
  extends BaseEntityPropsInterface<DeathBenefitResultId> {
  deathBenefitFirstAnalysis?: string | null;
  deathBenefitCompleteAnalysis?: string | null;
  deathBenefitSimplifiedAnalysis?: string | null;
  deathBenefitCompleteAnalysisDownload?: string | null;
}
