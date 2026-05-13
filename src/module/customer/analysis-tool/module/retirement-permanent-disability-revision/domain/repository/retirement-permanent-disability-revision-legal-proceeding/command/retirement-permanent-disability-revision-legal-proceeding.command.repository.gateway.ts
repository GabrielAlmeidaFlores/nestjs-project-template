import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionLegalProceedingEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-legal-proceeding/retirement-permanent-disability-revision-legal-proceeding.entity';

export abstract class RetirementPermanentDisabilityRevisionLegalProceedingCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionLegalProceeding(
    props: RetirementPermanentDisabilityRevisionLegalProceedingEntity,
  ): TransactionType;

  public abstract deleteAllByRetirementPermanentDisabilityRevisionId(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType;
}
