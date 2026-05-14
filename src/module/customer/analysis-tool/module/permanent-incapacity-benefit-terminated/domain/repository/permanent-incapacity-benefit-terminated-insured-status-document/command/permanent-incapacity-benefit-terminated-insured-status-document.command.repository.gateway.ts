import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status/value-object/permanent-incapacity-benefit-terminated-insured-status-id.value-object';
import type { PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-insured-status-document/permanent-incapacity-benefit-terminated-insured-status-document.entity';

export abstract class PermanentIncapacityBenefitTerminatedInsuredStatusDocumentCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedInsuredStatusDocument(
    props: PermanentIncapacityBenefitTerminatedInsuredStatusDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByPermanentIncapacityBenefitTerminatedInsuredStatusId(
    permanentIncapacityBenefitTerminatedInsuredStatusId: PermanentIncapacityBenefitTerminatedInsuredStatusId,
  ): TransactionType;
}
