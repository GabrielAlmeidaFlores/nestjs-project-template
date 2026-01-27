import { BaseBuildableObject } from '@shared/system/object/base-buildable.object';

import type { GetOrganizationMemberWithCustomerRelationQueryResult } from '@module/customer/account/domain/repository/organization-member/query/result/get-organization-member-with-customer-relation.query.result';
import type { GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-benefit.query.result';
import type { GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-document.query.result';
import type { GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis/query/result/get-disability-assessment-for-bpc-analysis-legal-proceeding.query.result';
import type { GetDisabilityAssessmentForBpcAnalysisResultQueryResult } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/repository/disability-assessment-for-bpc-analysis-result/query/result/get-disability-assessment-for-bpc-analysis-result.query.result';
import type { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';

export class GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult extends BaseBuildableObject {
  public readonly id: DisabilityAssessmentForBpcAnalysisId;
  public readonly estimatedDisabilityStartDate?: Date | null;
  public readonly attendsSchoolOrTechnicalCourse?: boolean | null;
  public readonly performsLaborActivity?: boolean | null;
  public readonly needsThirdPartyHelp?: boolean | null;
  public readonly hasAccessToBasicServices?: boolean | null;
  public readonly otherBarriersDescription?: string | null;
  public readonly disabilityAssessmentForBpcAnalysisResult: GetDisabilityAssessmentForBpcAnalysisResultQueryResult | null;
  public readonly disabilityAssessmentForBpcAnalysisLegalProceeding: GetDisabilityAssessmentForBpcAnalysisLegalProceedingQueryResult[];
  public readonly disabilityAssessmentForBpcAnalysisBenefit: GetDisabilityAssessmentForBpcAnalysisBenefitQueryResult[];
  public readonly disabilityAssessmentForBpcAnalysisDocument: GetDisabilityAssessmentForBpcAnalysisDocumentQueryResult[];
  public readonly createdBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly updatedBy: GetOrganizationMemberWithCustomerRelationQueryResult;
  public readonly createdAt: Date;
  public readonly updatedAt: Date;
  public readonly deletedAt: Date | null;

  protected override readonly _type =
    GetDisabilityAssessmentForBpcAnalysisWithRelationsQueryResult.name;
}
