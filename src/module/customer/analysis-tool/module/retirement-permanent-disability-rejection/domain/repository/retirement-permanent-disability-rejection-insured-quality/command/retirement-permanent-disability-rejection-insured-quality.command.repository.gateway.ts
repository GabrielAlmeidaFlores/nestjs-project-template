import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionInsuredQualityEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/retirement-permanent-disability-rejection-insured-quality.entity';
import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';

export abstract class RetirementPermanentDisabilityRejectionInsuredQualityCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionInsuredQuality(
    props: RetirementPermanentDisabilityRejectionInsuredQualityEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRejectionInsuredQuality(
    id: RetirementPermanentDisabilityRejectionInsuredQualityId,
    props: RetirementPermanentDisabilityRejectionInsuredQualityEntity,
  ): TransactionType;
}
