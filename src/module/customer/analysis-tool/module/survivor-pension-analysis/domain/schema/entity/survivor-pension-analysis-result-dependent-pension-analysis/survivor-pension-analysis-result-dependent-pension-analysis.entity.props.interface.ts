import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisResultId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result/value-object/survivor-pension-analysis-result-id/survivor-pension-analysis-result-id.value-object';
import type { SurvivorPensionAnalysisResultDependentPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-result-dependent-pension-analysis/value-object/survivor-pension-analysis-result-dependent-pension-analysis-id/survivor-pension-analysis-result-dependent-pension-analysis-id.value-object';

export interface SurvivorPensionAnalysisResultDependentPensionAnalysisEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisResultDependentPensionAnalysisId> {
  survivorPensionAnalysisResultId: SurvivorPensionAnalysisResultId;
  dependentName?: string | null;
  dependencyDegree?: string | null;
  isDependencyVerified?: boolean | null;
  pensionStartDate?: Date | null;
  estimatedPensionDuration?: string | null;
}
