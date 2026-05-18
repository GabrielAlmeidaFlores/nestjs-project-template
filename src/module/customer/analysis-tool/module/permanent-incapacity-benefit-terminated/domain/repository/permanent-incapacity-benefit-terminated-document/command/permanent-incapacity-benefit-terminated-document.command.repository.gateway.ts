import type { TransactionType } from '@core/domain/repository/base/transaction/type/transaction.type';
import type { PermanentIncapacityBenefitTerminatedId } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated/value-object/permanent-incapacity-benefit-terminated-id.value-object';
import type { PermanentIncapacityBenefitTerminatedDocumentEntity } from '@module/customer/analysis-tool/module/permanent-incapacity-benefit-terminated/domain/schema/entity/permanent-incapacity-benefit-terminated-document/permanent-incapacity-benefit-terminated-document.entity';

export abstract class PermanentIncapacityBenefitTerminatedDocumentCommandRepositoryGateway {
  public abstract createPermanentIncapacityBenefitTerminatedDocument(
    props: PermanentIncapacityBenefitTerminatedDocumentEntity,
  ): TransactionType;

  public abstract deleteAllByPermanentIncapacityBenefitTerminatedId(
    permanentIncapacityBenefitTerminatedId: PermanentIncapacityBenefitTerminatedId,
  ): TransactionType;
}
