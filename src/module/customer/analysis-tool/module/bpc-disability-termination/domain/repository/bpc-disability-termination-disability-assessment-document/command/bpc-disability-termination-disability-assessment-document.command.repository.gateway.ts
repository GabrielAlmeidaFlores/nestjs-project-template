import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';
import type { BpcDisabilityTerminationDisabilityAssessmentDocumentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment-document/bpc-disability-termination-disability-assessment-document.entity';

export abstract class BpcDisabilityTerminationDisabilityAssessmentDocumentCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationDisabilityAssessmentDocument(
    props: BpcDisabilityTerminationDisabilityAssessmentDocumentEntity,
  ): TransactionType;

  public abstract createManyBpcDisabilityTerminationDisabilityAssessmentDocument(
    props: BpcDisabilityTerminationDisabilityAssessmentDocumentEntity[],
  ): TransactionType[];

  public abstract deleteAllBpcDisabilityTerminationDisabilityAssessmentDocumentByBpcDisabilityTerminationDisabilityAssessmentId(
    id: BpcDisabilityTerminationDisabilityAssessmentId,
  ): TransactionType;
}
