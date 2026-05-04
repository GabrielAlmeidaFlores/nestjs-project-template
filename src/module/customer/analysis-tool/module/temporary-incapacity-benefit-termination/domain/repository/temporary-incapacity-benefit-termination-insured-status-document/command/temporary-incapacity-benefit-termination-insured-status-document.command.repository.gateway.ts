import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusId } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status/value-object/temporary-incapacity-benefit-termination-insured-status-id.value-object';
import type { TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/temporary-incapacity-benefit-termination/domain/schema/entity/temporary-incapacity-benefit-termination-insured-status-document/temporary-incapacity-benefit-termination-insured-status-document.entity';

export abstract class TemporaryIncapacityBenefitTerminationInsuredStatusDocumentCommandRepositoryGateway {
  public abstract createTemporaryIncapacityBenefitTerminationInsuredStatusDocument(
    props: TemporaryIncapacityBenefitTerminationInsuredStatusDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByTemporaryIncapacityBenefitTerminationInsuredStatusId(
    temporaryIncapacityBenefitTerminationInsuredStatusId: TemporaryIncapacityBenefitTerminationInsuredStatusId,
  ): TransactionType;
}
