import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import type { DisabilityAssessmentForBpcAnalysisDocumentTypeEnum } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/enum/disability-assessment-for-bpc-analysis-document-type.enum';
import type { DisabilityAssessmentForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/value-object/disability-assessment-for-bpc-analysis-document-id/disability-assessment-for-bpc-analysis-document-id.value-object';

export interface DisabilityAssessmentForBpcAnalysisDocumentEntityPropsInterface extends BaseEntityPropsInterface<DisabilityAssessmentForBpcAnalysisDocumentId> {
  document: string;
  type: DisabilityAssessmentForBpcAnalysisDocumentTypeEnum;
  disabilityAssessmentForBpcAnalysis: DisabilityAssessmentForBpcAnalysisEntity;
}
