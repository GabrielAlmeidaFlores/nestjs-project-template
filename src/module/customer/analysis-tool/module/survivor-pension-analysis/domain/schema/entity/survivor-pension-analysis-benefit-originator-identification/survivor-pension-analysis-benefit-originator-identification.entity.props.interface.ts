import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { AnalysisToolClientId } from '@module/customer/analysis-tool/domain/schema/entity/analysis-tool-client/value-object/analysis-tool-client-id/analysis-tool-client-id.value-object';
import type { SurvivorPensionAnalysisId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis/value-object/survivor-pension-analysis-id/survivor-pension-analysis-id.value-object';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';

export interface SurvivorPensionAnalysisBenefitOriginatorIdentificationEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisBenefitOriginatorIdentificationId> {
  survivorPensionAnalysisId: SurvivorPensionAnalysisId;
  analysisToolClientId?: AnalysisToolClientId | null;
  deathDate?: Date | null;
  federativeEntity?: string | null;
  stateCode?: string | null;
  beneficiaryWasRetired?: boolean | null;
}
