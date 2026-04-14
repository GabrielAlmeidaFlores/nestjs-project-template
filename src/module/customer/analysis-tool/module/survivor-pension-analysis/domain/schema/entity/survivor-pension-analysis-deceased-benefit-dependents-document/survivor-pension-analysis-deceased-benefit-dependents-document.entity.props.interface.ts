import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents/value-object/survivor-pension-analysis-deceased-benefit-dependents-id/survivor-pension-analysis-deceased-benefit-dependents-id.value-object';
import type { SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-deceased-benefit-dependents-document/value-object/survivor-pension-analysis-deceased-benefit-dependents-document-id/survivor-pension-analysis-deceased-benefit-dependents-document-id.value-object';

export interface SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisDeceasedBenefitDependentsDocumentId> {
  documentType: string;
  documentName: string;
  survivorPensionAnalysisDeceasedBenefitDependentsId: SurvivorPensionAnalysisDeceasedBenefitDependentsId;
}
