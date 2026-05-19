import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status/value-object/temporary-incapacity-benefit-rejection-insured-status-id.value-object';
import type { TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-rejection/domain/schema/entity/temporary-incapacity-benefit-rejection-insured-status-document/temporary-incapacity-benefit-rejection-insured-status-document.entity';

export abstract class TemporaryIncapacityBenefitRejectionInsuredStatusDocumentCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitRejectionInsuredStatusDocument(
    props: TemporaryIncapacityBenefitRejectionInsuredStatusDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitRejectionInsuredStatusId(
    temporaryIncapacityBenefitRejectionInsuredStatusId: TemporaryIncapacityBenefitRejectionInsuredStatusId,
  ): TransactionType;
}
