import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/retirement-permanent-disability-rejection-period.entity';
import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';

export abstract class RetirementPermanentDisabilityRejectionPeriodCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionPeriod(
    props: RetirementPermanentDisabilityRejectionPeriodEntity,
  ): TransactionType;

  public abstract deleteRetirementPermanentDisabilityRejectionPeriod(
    id: RetirementPermanentDisabilityRejectionPeriodId,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionPeriodsByRetirementPermanentDisabilityRejectionId(
    id: RetirementPermanentDisabilityRejectionId,
  ): TransactionType;
}
