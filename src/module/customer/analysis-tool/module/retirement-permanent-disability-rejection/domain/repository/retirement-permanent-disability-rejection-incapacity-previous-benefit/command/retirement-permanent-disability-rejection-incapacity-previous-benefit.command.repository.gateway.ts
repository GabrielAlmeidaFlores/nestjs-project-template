import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-previous-benefit/retirement-permanent-disability-rejection-incapacity-previous-benefit.entity';

export abstract class RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionIncapacityPreviousBenefit(
    props: RetirementPermanentDisabilityRejectionIncapacityPreviousBenefitEntity,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionIncapacityPreviousBenefitsByIncapacityId(
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType;
}
