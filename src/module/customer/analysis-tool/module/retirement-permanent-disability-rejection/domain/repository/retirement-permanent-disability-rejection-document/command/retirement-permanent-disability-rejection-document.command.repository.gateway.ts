import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection/value-object/retirement-permanent-disability-rejection-id/retirement-permanent-disability-rejection-id.value-object';
import type { RetirementPermanentDisabilityRejectionDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-document/retirement-permanent-disability-rejection-document.entity';

export abstract class RetirementPermanentDisabilityRejectionDocumentCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionDocument(
    props: RetirementPermanentDisabilityRejectionDocumentEntity,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionDocumentsByRetirementPermanentDisabilityRejectionId(
    id: RetirementPermanentDisabilityRejectionId,
  ): TransactionType;
}
