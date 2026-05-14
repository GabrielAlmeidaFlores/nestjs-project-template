import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionIncapacityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity/value-object/retirement-permanent-disability-rejection-incapacity-id/retirement-permanent-disability-rejection-incapacity-id.value-object';
import type { RetirementPermanentDisabilityRejectionIncapacityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-incapacity-document/retirement-permanent-disability-rejection-incapacity-document.entity';

export abstract class RetirementPermanentDisabilityRejectionIncapacityDocumentCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionIncapacityDocument(
    props: RetirementPermanentDisabilityRejectionIncapacityDocumentEntity,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionIncapacityDocumentsByIncapacityId(
    incapacityId: RetirementPermanentDisabilityRejectionIncapacityId,
  ): TransactionType;
}
