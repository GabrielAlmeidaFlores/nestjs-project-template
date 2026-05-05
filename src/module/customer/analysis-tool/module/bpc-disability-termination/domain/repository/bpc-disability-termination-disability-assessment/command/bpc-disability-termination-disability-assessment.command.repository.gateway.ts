import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { BpcDisabilityTerminationId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination/value-object/bpc-disability-termination-id/bpc-disability-termination-id.value-object';
import type { BpcDisabilityTerminationDisabilityAssessmentEntity } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/bpc-disability-termination-disability-assessment.entity';
import type { BpcDisabilityTerminationDisabilityAssessmentId } from '@module/customer/analysis-tool/module/bpc-disability-termination/domain/schema/entity/bpc-disability-termination-disability-assessment/value-object/bpc-disability-termination-disability-assessment-id/bpc-disability-termination-disability-assessment-id.value-object';

export abstract class BpcDisabilityTerminationDisabilityAssessmentCommandRepositoryGateway {
  public abstract createBpcDisabilityTerminationDisabilityAssessment(
    props: BpcDisabilityTerminationDisabilityAssessmentEntity,
    bpcDisabilityTerminationId: BpcDisabilityTerminationId,
  ): TransactionType;

  public abstract updateBpcDisabilityTerminationDisabilityAssessment(
    id: BpcDisabilityTerminationDisabilityAssessmentId,
    props: BpcDisabilityTerminationDisabilityAssessmentEntity,
  ): TransactionType;
}
