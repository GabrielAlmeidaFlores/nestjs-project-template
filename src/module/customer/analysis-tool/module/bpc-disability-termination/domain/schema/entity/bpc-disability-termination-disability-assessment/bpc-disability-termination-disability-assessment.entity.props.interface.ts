import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';
import type { BpcDisabilityTerminationDisabilityAssessmentDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity';

export interface BpcDisabilityTerminationDisabilityAssessmentEntityPropsInterface extends BaseEntityPropsInterface<BpcDisabilityTerminationDisabilityAssessmentId> {
  estimatedDisabilityStartDate?: Date | null;
  attendsSchoolOrTechnicalCourse?: boolean | null;
  performsLaborActivity?: boolean | null;
  needsThirdPartyHelp?: boolean | null;
  hasAccessToBasicServices?: boolean | null;
  otherBarriersDescription?: string | null;
  bpcDisabilityTerminationDisabilityAssessmentDocument?:
    | BpcDisabilityTerminationDisabilityAssessmentDocumentEntity[]
    | null;
}
