import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import type { BpcDisabilityTerminationDisabilityAssessmentDocumentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/value-object/bpc-disability-termination-disability-assessment-document-id/bpc-disability-termination-disability-assessment-document-id.value-object';

export interface BpcDisabilityTerminationDisabilityAssessmentDocumentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationDisabilityAssessmentDocumentId> {
  document: string;
  bpcDisabilityTerminationDisabilityAssessment: BpcDisabilityTerminationDisabilityAssessmentEntity;
}
