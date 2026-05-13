import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRevisionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision/value-object/retirement-permanent-disability-revision-id.value-object';
import type { RetirementPermanentDisabilityRevisionInssBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-revision/domain/schema/entity/retirement-permanent-disability-revision-inss-benefit/retirement-permanent-disability-revision-benefit.entity';

export abstract class RetirementPermanentDisabilityRevisionInssBenefitCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRevisionInssBenefit(
    props: RetirementPermanentDisabilityRevisionInssBenefitEntity,
  ): TransactionType;

  public abstract deleteAllByRetirementPermanentDisabilityRevisionId(
    retirementPermanentDisabilityRevisionId: RetirementPermanentDisabilityRevisionId,
  ): TransactionType;
}
