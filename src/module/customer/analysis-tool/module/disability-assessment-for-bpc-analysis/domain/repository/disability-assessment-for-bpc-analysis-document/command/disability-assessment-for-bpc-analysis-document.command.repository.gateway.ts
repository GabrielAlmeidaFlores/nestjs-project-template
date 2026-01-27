import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { DisabilityAssessmentForBpcAnalysisDocumentEntity } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/disability-assessment-for-bpc-analysis-document.entity';
import type { DisabilityAssessmentForBpcAnalysisDocumentId } from '@module/customer/analysis-tool/module/disability-assessment-for-bpc-analysis/domain/schema/entity/disability-assessment-for-bpc-analysis-document/value-object/disability-assessment-for-bpc-analysis-document-id/disability-assessment-for-bpc-analysis-document-id.value-object';

export abstract class DisabilityAssessmentForBpcAnalysisDocumentCommandRepositoryGateway {
  public abstract createDisabilityAssessmentForBpcAnalysisDocument(
    props: DisabilityAssessmentForBpcAnalysisDocumentEntity,
  ): TransactionType;

  public abstract deleteDisabilityAssessmentForBpcAnalysisDocument(
    id: DisabilityAssessmentForBpcAnalysisDocumentId,
  ): TransactionType;
}
