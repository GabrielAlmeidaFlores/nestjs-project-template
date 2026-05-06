import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { RetirementPermanentDisabilityRejectionPeriodId } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period/value-object/retirement-permanent-disability-rejection-period-id/retirement-permanent-disability-rejection-period-id.value-object';
import type { RetirementPermanentDisabilityRejectionPeriodDocumentEntity } from '@module/customer/analysis-tool/module/retirement-permanent-disability-rejection/domain/schema/entity/retirement-permanent-disability-rejection-period-document/retirement-permanent-disability-rejection-period-document.entity';

export abstract class RetirementPermanentDisabilityRejectionPeriodDocumentCommandRepositoryGateway {
  public abstract createRetirementPermanentDisabilityRejectionPeriodDocument(
    props: RetirementPermanentDisabilityRejectionPeriodDocumentEntity,
  ): TransactionType;

  public abstract deleteAllRetirementPermanentDisabilityRejectionPeriodDocumentsByPeriodId(
    periodId: RetirementPermanentDisabilityRejectionPeriodId,
  ): TransactionType;
}
