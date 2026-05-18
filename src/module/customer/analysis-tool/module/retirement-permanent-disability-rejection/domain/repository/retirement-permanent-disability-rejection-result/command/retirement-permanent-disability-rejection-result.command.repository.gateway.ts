import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionResultEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/retirement-permanent-disability-rejection-result.entity';
import type { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

export abstract class RetirementPermanentDisabilityRejectionResultCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionResult(
    props: RetirementPermanentDisabilityRejectionResultEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRejectionResult(
    id: RetirementPermanentDisabilityRejectionResultId,
    props: RetirementPermanentDisabilityRejectionResultEntity,
  ): TransactionType;
}
