import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionInsuredQualityId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality/value-object/retirement-permanent-disability-rejection-insured-quality-id/retirement-permanent-disability-rejection-insured-quality-id.value-object';
import type { RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-insured-quality-document/retirement-permanent-disability-rejection-insured-quality-document.entity';

export abstract class RetirementPermanentDisabilityRejectionInsuredQualityDocumentCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionInsuredQualityDocument(
    props: RetirementPermanentDisabilityRejectionInsuredQualityDocumentEntity,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionInsuredQualityDocumentsByInsuredQualityId(
    insuredQualityId: RetirementPermanentDisabilityRejectionInsuredQualityId,
  ): TransactionType;
}
