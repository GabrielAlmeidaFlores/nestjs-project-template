import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification/value-object/survivor-pension-analysis-benefit-originator-identification-id/survivor-pension-analysis-benefit-originator-identification-id.value-object';
import type { SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId } from '@module/customer/analysis-tool/module/survivor-pension-analysis/domain/schema/entity/survivor-pension-analysis-benefit-originator-identification-document/value-object/survivor-pension-analysis-benefit-originator-identification-document-id/survivor-pension-analysis-benefit-originator-identification-document-id.value-object';

export interface SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentEntityPropsInterface extends BaseEntityPropsInterface<SurvivorPensionAnalysisBenefitOriginatorIdentificationDocumentId> {
  documentType: string;
  documentName: string;
  survivorPensionAnalysisBenefitOriginatorIdentificationId: SurvivorPensionAnalysisBenefitOriginatorIdentificationId;
}
