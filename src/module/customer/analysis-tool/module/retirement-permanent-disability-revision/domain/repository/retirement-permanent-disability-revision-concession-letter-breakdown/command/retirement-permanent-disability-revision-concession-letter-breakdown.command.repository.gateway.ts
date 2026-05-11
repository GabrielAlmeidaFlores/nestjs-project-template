import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/retirement-permanent-disability-revision-concession-letter-breakdown.entity';
import type { RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-concession-letter-breakdown/value-object/retirement-permanent-disability-revision-concession-letter-breakdown-id/retirement-permanent-disability-revision-concession-letter-breakdown-id.value-object';

export abstract class RetirementPermanentDisabilityRevisionConcessionLetterBreakdownCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionConcessionLetterBreakdown(
    entity: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRevisionConcessionLetterBreakdown(
    id: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownId,
    entity: RetirementPermanentDisabilityRevisionConcessionLetterBreakdownEntity,
  ): TransactionType;

  public abstract deleteByRetirementPermanentDisabilityRevisionId(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType;
}
