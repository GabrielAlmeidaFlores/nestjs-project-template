import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { OrganizationMemberId } from '@module/customer/account/domain/schema/entity/organization-member/value-object/organization-member-id/organization-member-id.value-object';
import type { DisabilityAssessmentForBpcAnalysisEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/disability-assessment-for-bpc-analysis.entity';
import type { DisabilityAssessmentForBpcAnalysisId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis/value-object/disability-assessment-for-bpc-analysis-id/disability-assessment-for-bpc-analysis-id.value-object';

export abstract class DisabilityAssessmentForBpcAnalysisCommandRepositoryGateway {
  public abstract createDisabilityAssessmentForBpcAnalysis(
    props: DisabilityAssessmentForBpcAnalysisEntity,
  ): TransactionType;

  public abstract updateDisabilityAssessmentForBpcAnalysis(
    id: DisabilityAssessmentForBpcAnalysisId,
    props: DisabilityAssessmentForBpcAnalysisEntity,
  ): TransactionType;

  public abstract deleteDisabilityAssessmentForBpcAnalysis(
    id: DisabilityAssessmentForBpcAnalysisId,
    updatedBy: OrganizationMemberId,
  ): TransactionType;
}
