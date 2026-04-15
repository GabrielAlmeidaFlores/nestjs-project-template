import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';

export interface SurvivorPensionAnalysisDeceasedBenefitDependentsEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisDeceasedBenefitDependentsId> {
  survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  dependentFullName?: string | null;
  dependencyClassificationLevel?: string | null;
  type?: string | null;
  gender?: string | null;
  dateOfBirth?: Date | null;
  hasDisabilityOrInvalidity?: boolean | null;
  unionCommencementDate?: Date | null;
}
