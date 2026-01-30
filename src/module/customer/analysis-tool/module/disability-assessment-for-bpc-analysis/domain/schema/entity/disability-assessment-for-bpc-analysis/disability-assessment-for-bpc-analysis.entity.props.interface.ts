import type { BaseEntityPropsInterface } from '@core/domain/schema/entity/base/base.entity.props.interface';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';
import type { DisabilityAssessmentForBpcAnalysisBenefitEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-benefit/disability-assessment-for-bpc-analysis-benefit.entity';
import type { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import type { DisabilityAssessmentForBpcAnalysisLegalProceedingEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-legal-proceeding/disability-assessment-for-bpc-analysis-legal-proceeding.entity';
import type { DisabilityAssessmentForBpcAnalysisResultEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-result/disability-assessment-for-bpc-analysis-result.entity';

export interface DisabilityAssessmentForBpcAnalysisEntityPropsInterface extends BaseEntityPropsInterface<DisabilityAssessmentForBpcAnalysisId> {
  estimatedDisabilityStartDate?: Date | null;
  attendsSchoolOrTechnicalCourse?: boolean | null;
  performsLaborActivity?: boolean | null;
  needsThirdPartyHelp?: boolean | null;
  hasAccessToBasicServices?: boolean | null;
  otherBarriersDescription?: string | null;

  disabilityAssessmentForBpcAnalysisResult?: DisabilityAssessmentForBpcAnalysisResultEntity | null;
  disabilityAssessmentForBpcAnalysisBenefit?:
    | DisabilityAssessmentForBpcAnalysisBenefitEntity[]
    | null;
  disabilityAssessmentForBpcAnalysisLegalProceeding?:
    | DisabilityAssessmentForBpcAnalysisLegalProceedingEntity[]
    | null;
  disabilityAssessmentForBpcAnalysisDocument?:
    | DisabilityAssessmentForBpcAnalysisDocumentEntity[]
    | null;
  createdBy: OrganizationMemberId;
  updatedBy: OrganizationMemberId;
}
