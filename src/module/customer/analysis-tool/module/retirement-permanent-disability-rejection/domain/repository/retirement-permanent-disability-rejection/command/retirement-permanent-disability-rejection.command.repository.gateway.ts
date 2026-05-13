import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/retirement-permanent-disability-rejection.entity';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import type { RetirementPermanentDisabilityRejectionResultId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-result/value-object/retirement-permanent-disability-rejection-result-id/retirement-permanent-disability-rejection-result-id.value-object';

export abstract class RetirementPermanentDisabilityRejectionCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejection(
    props: RetirementPermanentDisabilityRejectionEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRejection(
    id: RetirementPermanentDisabilityRejectionId,
    props: RetirementPermanentDisabilityRejectionEntity,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRejectionResultId(
    id: RetirementPermanentDisabilityRejectionId,
    resultId: RetirementPermanentDisabilityRejectionResultId,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRejectionIncapacityId(
    id: RetirementPermanentDisabilityRejectionId,
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType;

  public abstract updateRetirementPermanentDisabilityRejectionInsuredQualityId(
    id: RetirementPermanentDisabilityRejectionId,
    insuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId,
  ): TransactionType;
}
