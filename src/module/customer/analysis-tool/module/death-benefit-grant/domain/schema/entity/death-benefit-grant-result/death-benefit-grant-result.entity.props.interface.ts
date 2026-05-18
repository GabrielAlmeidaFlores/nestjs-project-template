import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DeathBenefitGrantResultId } from '@module/customer/analysis-tool/module/death-benefit-grant/domain/schema/entity/death-benefit-grant-result/value-object/death-benefit-grant-result-id.value-object';

export interface DeathBenefitGrantResultEntityPropsInterface extends BaseEntityPropsInterface<DeathBenefitGrantResultId> {
  deathBenefitGrantFirstAnalysis?: string | null;
  deathBenefitGrantCompleteAnalysis?: string | null;
  deathBenefitGrantSimplifiedAnalysis?: string | null;
  deathBenefitGrantCompleteAnalysisDownload?: string | null;
}
